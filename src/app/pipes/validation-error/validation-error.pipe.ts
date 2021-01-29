import { FormControl } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { PATTERN_ERRORS } from '../../constant/error';
import { VALIDATION_MESSAGES, toTitleCase } from '../../constant/messages';
@Pipe({
  name: 'validate',
  pure: false
})
export class ValidationErrorPipe implements PipeTransform {

  charMessage: string;
  constructor() {
  }
  transform(control: FormControl, name: string, type?: string): any {
    return control && control.errors ? this.getValidationError(control, name, type) : ''
  }
  
  getValidationError(control: FormControl, name, type) {
    
    if (type) {
      this.charMessage = type
    }
    else {
      this.charMessage = "characters"
    }
    if (control.hasError('required')) {
      return `${name} is required`;
    }
    if (control.hasError('pattern')) {
      let pattern = control.errors.pattern.requiredPattern;
      return PATTERN_ERRORS(pattern, name);
    }
    if (control.hasError('minlength')) {
      return `${toTitleCase(name)} must be at least ${control.errors.minlength.requiredLength} ${this.charMessage} long`;
    }
    if (control.hasError('maxlength')) {
      return `${toTitleCase(name)} can not be more than ${control.errors.maxlength.requiredLength} ${this.charMessage} long`;
    }
    if (control.hasError('matchPassword')) {
      return VALIDATION_MESSAGES[name]['matchPassword'] || '';
    }
    if (control.hasError('min')) {
      return `${toTitleCase(name)} can not be less than ${control.errors.min.min}`;
    }
    if (control.hasError('max')) {
      return `${toTitleCase(name)} can not be greater than ${control.errors.max.max}`;
    }
    if (control.hasError('alpha')) {
      return ` Please enter correct ${toTitleCase(name)}`;
    }
  }
}