import { AbstractControl, ValidatorFn } from "@angular/forms";

export function requiredFileType( types: Array<string> ): ValidatorFn {
    return (control: AbstractControl):{[key: string]: any} | null => {
      const file = control.value;
      if (file && !file.startsWith("data:image/")) {
        const extension = file.split('.')[1].toLowerCase();
        if(types.some(type => {
            return type.toLowerCase() == extension.toLowerCase();
        })) {
            return null;
        } else {
          return {
            invalidFileType: {value: file}
          };
        }
      }
      return null;
    };
}