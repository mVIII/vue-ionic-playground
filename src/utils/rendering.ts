import { FieldView, schemaField } from '@/types';

import { FieldTypes } from '@/types';

function fieldViewsFromSchema(schemaFields: schemaField[]): FieldView[] {
  return schemaFields.map((field) => {
    const newFieldView: FieldView = {
      name: field.name,
      type: field.type,
      color: field.name,
      required: field.required,
      value: '',
    };
    switch (field.type) {
      case FieldTypes.Number:
        newFieldView.value = 0;
        break;
      case FieldTypes.Boolean:
        newFieldView.value = false;
        break;
      case FieldTypes.Enum:
        newFieldView.value = [];
        newFieldView.enum = field.enum;
        break;
    }
    return newFieldView;
  });
}
export { fieldViewsFromSchema };
