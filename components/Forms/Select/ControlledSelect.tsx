import React, { FC } from 'react';
import * as PropTypes from 'prop-types';
import { useController } from 'react-hook-form';

import { ConnectForm } from '@/commons/utils/form.utils';
import CustomSelect from './Select';

// How to use ControlledSelect:
// const methods = useForm()
// const { handleSubmit } = methods
// const onSubmit = (data) => console.log(data)
//
// const options = [{ value: 1, name: "Select One"}]
// return (
//   <FormProvider {...methods}>
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <ControlledSelect name="select" options={options} />
//       <button type="submit">submit</button>
//     </form>
//   </FormProvider>
// )

type ControlledSelectProps = {
  options?: {
    value: any;
    label: any;
  }[];
  id?: any;
  defaultValue?: { label: string; value: string } | { label: string; value: string }[];
  onChange?: (value: any) => void;
  name: string;
  control: any;
  disabled?: boolean;
  readOnly?: boolean;
  rules?: any;
  placeholder?: string;
  isHasChevronDown?: boolean;
  isMulti?: boolean;
  label?: string;
  [x: string]: any;
};

const ControlledSelect: FC<ControlledSelectProps> = ({
  options = [],
  rules = {},
  defaultValue,
  name,
  control,
  placeholder,
  disabled = false,
  readOnly,
  onChange,
  isMulti = false,
  isHasChevronDown = true,
  label,
  ...other
}) => {
  const {
    field: { onChange: fieldOnChange, onBlur, name: fieldName, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <ConnectForm>
      {() => (
        <CustomSelect
          onChange={(value) => {
            fieldOnChange(value);
            if (typeof onChange === 'function') onChange(value);
          }}
          onBlur={onBlur}
          value={value}
          name={fieldName}
          ref={ref}
          placeholder={placeholder}
          options={options}
          disabled={disabled}
          readOnly={readOnly}
          defaultValue={defaultValue}
          error={error?.message}
          isHasChevronDown={isHasChevronDown}
          isMulti={isMulti}
          label={label}
          rules={rules}
          {...other}
        />
      )}
    </ConnectForm>
  );
};

ControlledSelect.propTypes = {
  /**
   * options is an array of object that has value and label, that will
   * correspond with the value selected with the corresponding label
   */
  options: PropTypes.any,
  /**
   * rules is an optional field that defines the rules in the controllers hook, defining rules of
   * the field from whether the field is required/not, and other validations
   */
  rules: PropTypes.any,
  /**
   * defaultValue is an optional field that defines the default value of the date field
   */
  defaultValue: PropTypes.any,
  /**
   * name is a any that is the name of the field in
   * the form
   */
  name: PropTypes.any,
};

export default ControlledSelect;
