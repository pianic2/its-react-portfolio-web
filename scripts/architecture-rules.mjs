import ts from 'typescript'

const sourceExtension = /\.(?:ts|tsx)$/
const testFile = /\.(?:test|spec)\.(?:ts|tsx)$/
const web3FormsEndpoint = 'api.web3forms.com'

function parseSource(file) {
  return ts.createSourceFile(file.path, file.source, ts.ScriptTarget.Latest, true)
}

function importsOf(sourceFile) {
  return sourceFile.statements.flatMap((statement) =>
    ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier)
      ? [statement.moduleSpecifier.text]
      : [],
  )
}

function visit(sourceFile, predicate) {
  let match = false
  function walk(node) {
    if (predicate(node)) match = true
    if (!match) ts.forEachChild(node, walk)
  }
  walk(sourceFile)
  return match
}

function hasProductionConsoleCall(sourceFile) {
  return visit(
    sourceFile,
    (node) =>
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      ts.isIdentifier(node.expression.expression) &&
      node.expression.expression.text === 'console' &&
      ['log', 'debug', 'info'].includes(node.expression.name.text),
  )
}

function hasSilentCatch(sourceFile) {
  return visit(
    sourceFile,
    (node) =>
      ts.isCatchClause(node) &&
      node.block.statements.length === 0 &&
      !/\/\/|\/\*/.test(node.block.getText(sourceFile)),
  )
}

function hasExplicitAny(sourceFile) {
  return visit(sourceFile, (node) => node.kind === ts.SyntaxKind.AnyKeyword)
}

function hasWeb3FormsEndpointAccess(sourceFile) {
  return visit(
    sourceFile,
    (node) =>
      ts.isPropertyAccessExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === 'externalLinks' &&
      node.name.text === 'web3FormsEndpoint',
  )
}

function normalize(path) {
  return path.replaceAll('\\', '/')
}

export function analyzeSourceFiles(files) {
  const blocking = []
  const informational = []
  const sourceFiles = files.filter((file) => sourceExtension.test(file.path))

  for (const file of sourceFiles) {
    const path = normalize(file.path)
    const sourceFile = parseSource({ ...file, path })
    const imports = importsOf(sourceFile)
    const isTest = testFile.test(path)
    const isWeb3FormsAdapter = path === 'src/services/contact/web3Forms.ts'
    const isExternalLinkRegistry = path === 'src/config/externalLinks.ts'

    if (
      !isTest &&
      !isWeb3FormsAdapter &&
      !isExternalLinkRegistry &&
      file.source.includes(web3FormsEndpoint)
    ) {
      blocking.push(`${path}: direct Web3Forms endpoint outside the service adapter`)
    }
    if (!isWeb3FormsAdapter && hasWeb3FormsEndpointAccess(sourceFile)) {
      blocking.push(`${path}: Web3Forms endpoint accessed outside the service adapter`)
    }
    if (!isTest && hasProductionConsoleCall(sourceFile)) {
      blocking.push(`${path}: production console logging`)
    }
    if (hasSilentCatch(sourceFile)) blocking.push(`${path}: completely silent catch block`)
    if (hasExplicitAny(sourceFile)) blocking.push(`${path}: explicit any type`)

    if (
      path.startsWith('src/components/') &&
      imports.some((specifier) => specifier.includes('/pages/'))
    ) {
      blocking.push(`${path}: component layer imports page layer`)
    }
    if (
      path.startsWith('src/content/') &&
      imports.some((specifier) => /\/(?:components|features|pages)\//.test(specifier))
    ) {
      blocking.push(`${path}: content layer imports presentation layer`)
    }
    if (
      /src\/(?:components|features|pages)\//.test(path) &&
      imports.some((specifier) => /services\/contact\/(?!index(?:\.|$))/.test(specifier))
    ) {
      blocking.push(`${path}: UI imports a contact-service internal module`)
    }
    if (file.source.split('\n').length > 500) {
      informational.push(`${path}: exceeds 500 lines; review responsibility split manually`)
    }
  }

  return { blocking, informational }
}

export function findPossibleDeadFiles(files) {
  const sourceFiles = files.filter(
    (file) => sourceExtension.test(file.path) && !testFile.test(file.path),
  )
  return sourceFiles
    .filter(
      (file) =>
        !file.path.endsWith('/index.ts') &&
        !file.path.endsWith('/main.tsx') &&
        !file.path.endsWith('.d.ts'),
    )
    .map((file) => ({
      basename: file.path.replace(/^.*\//, '').replace(sourceExtension, ''),
      otherSource: sourceFiles
        .filter((candidate) => candidate !== file)
        .map((candidate) => candidate.source)
        .join('\n'),
    }))
    .filter(
      ({ basename, otherSource }) => new RegExp(`\\b${basename}\\b`).test(otherSource) === false,
    )
    .map(({ basename }) => `possible dead file: ${basename} is not referenced by name`)
}
