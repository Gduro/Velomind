import { CogIcon, UserIcon, DocumentsIcon } from '@sanity/icons'
import type { StructureBuilder, StructureResolver } from 'sanity/structure'

const DISABLED_TYPES = ['settings', 'aboutMe', 'post', 'assist.instruction.context']

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Zawartość')
    .items([
      // 1. SINGLETON: O MNIE
      S.listItem()
        .title('Strona O mnie')
        .icon(UserIcon)
        .child(S.document().schemaType('aboutMe').documentId('aboutMe')),

      S.divider(),

      // 2. WPISY ROWEROWE
      S.listItem()
        .title('Wpisy: Rowery')
        .icon(() => '🚴')
        .child(
          S.documentList()
            .title('Artykuły Rowerowe')
            .filter('_type == "post" && category == "cycling"')
        ),

      // 3. WPISY: ROZWÓJ
      S.listItem()
        .title('Wpisy: Rozwój')
        .icon(() => '🧠')
        .child(
          S.documentList()
            .title('Artykuły o Rozwoju')
            .filter('_type == "post" && category == "mindset"')
        ),

      S.divider(),

      // 4. WSZYSTKIE WPISY (Podgląd zbiorczy)
      S.listItem()
        .title('Wszystkie wpisy')
        .icon(DocumentsIcon)
        .child(S.documentTypeList('post').title('Wszystkie wpisy')),

      S.divider(),

      // 5. USTAWIENIA
      S.listItem()
        .title('Ustawienia strony')
        .icon(CogIcon)
        .child(S.document().schemaType('settings').documentId('siteSettings')),
    ])