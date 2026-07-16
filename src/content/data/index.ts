import type { ContentRepository } from '../schema'
import { englishContent } from './en'
import { italianContent } from './it'
import { sharedContent } from './shared'

export const rawContentRepository = {
  ...sharedContent,
  locales: {
    it: italianContent,
    en: englishContent,
  },
} satisfies ContentRepository
