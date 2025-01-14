// ./deskStructure.js
import {CogIcon} from '@sanity/icons'
import {Palette, PanelTop} from 'lucide-react'
import {StructureBuilder} from 'sanity/structure'

//Helper function to create Singletons
const singletonListItem = (S: StructureBuilder, typeName: string, title?: string) =>
  S.listItem()
    .title(title || typeName)
    .id(typeName)
    .child(
      S.document()
        .title(title || typeName)
        .schemaType(typeName)
        .documentId(typeName),
    )

//Desk Structure Settings
export const structure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      ...S.documentTypeListItems().filter(
        // Remove the "assist.instruction.context" and "settings" content  from the list of content types
        (listItem: any) =>
          !['person', 'post', 'settings', 'style', 'header', 'assist.instruction.context'].includes(
            listItem.getId(),
          ),
      ),
      S.divider(),
      singletonListItem(S, 'header', 'Header Navigation Settings').icon(PanelTop),
      singletonListItem(S, 'settings', 'Site Settings').icon(CogIcon),

      S.divider(),
      singletonListItem(S, 'style', 'Style Settings').icon(Palette),
    ])
