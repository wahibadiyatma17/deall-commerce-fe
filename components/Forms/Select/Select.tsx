import React, { FC, useCallback, useRef } from 'react';
import * as PropTypes from 'prop-types';
import Select from 'react-select';
import { FiChevronDown } from 'react-icons/fi';
import { BiErrorCircle } from 'react-icons/bi';
import { styled } from 'twin.macro';

export type CustomSelectProps = {
  onChange?: (value: any) => void;
  onBlur?: () => void;
  id?: any;
  value: any;
  name?: string;
  defaultValue?: { label: string; value: string } | { label: string; value: string }[];
  options?: {
    value: any;
    label: any;
  }[];
  ref?: any;
  placeholder?: any;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  isHasChevronDown?: boolean;
  isMulti?: boolean;
  label?: string;
  rules?: any;
  [x: string]: any;
};

const CustomSelect: FC<CustomSelectProps> = React.forwardRef(
  ({
    onChange,
    onBlur,
    value,
    name,
    placeholder,
    defaultValue,
    options = [],
    id,
    disabled,
    readOnly,
    error,
    prefix,
    suffix,
    isHasChevronDown = true,
    isMulti = false,
    label,
    rules,
    ...other
  }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const setFocusToInputRef = useCallback(() => {
      if (inputRef.current) inputRef.current.focus();
    }, [inputRef]);

    const customStyles = {
      control: () => ({
        border: 0,
        boxShadow: 'none',
        fontSize: '0.875rem',
      }),

      option: (provided: any, state: any) => ({
        ...provided,
        borderBottom: 0,
        color: '#393938',
        fontSize: '0.875rem',
        backgroundColor: state.isFocused ? '#d6c1f9' : '#FFFFFF',
        overflowY: 'hidden',
      }),
      menuList: (base: any) => ({
        ...base,
        '::-webkit-scrollbar': {
          width: '0px',
          height: '0px',
        },
      }),
      menu: (provided: any, state: any) => ({
        ...provided,
        borderBottom: 0,
        color: '#393938',
        backgroundColor: state.isFocused ? '#d6c1f9' : '#FFFFFF',
        width: '100%',
        zIndex: 999,
      }),

      singleValue: (provided: any) => {
        const transition = 'opacity 300ms';
        const color = '#555555 !important';
        const fontWeight = 500;

        return { ...provided, transition, color, fontWeight };
      },
      placeholder: (defaultStyles: any) => {
        return {
          ...defaultStyles,
          fontSize: '0.875rem',
          fontWeight: 500,
          color: '#ABAEB8',
        };
      },
      container: (defaultStyles: any) => {
        return {
          ...defaultStyles,
          width: '100%',
        };
      },
      multiValue: (defaultStyles: any) => {
        return {
          ...defaultStyles,
          backgroundColor: '#d6c1f9',
          color: '#601bd0',
          borderRadius: '0.25rem',
        };
      },
      multiValueLabel: (defaultStyles: any) => {
        return {
          ...defaultStyles,
          color: '#601bd0',
          fontWeight: 600,
        };
      },
    };

    return (
      <div tw="flex flex-col gap-2">
        {label && (
          <div tw="flex items-center gap-[0.125rem]">
            <label tw="font-medium text-sm">{label}</label>
            {rules?.required && <span tw="text-[#d21c1c] font-semibold">*</span>}
          </div>
        )}
        <StyledSelectContainer
          onClick={() => setFocusToInputRef()}
          disabled={disabled ?? false}
          readOnly={readOnly ?? false}
          error={error}
        >
          <div tw="flex items-center w-full h-full">
            {prefix && <span tw="pl-2 h-6">{prefix}</span>}
            <Select
              id={id}
              options={options}
              onChange={onChange}
              onBlur={onBlur}
              styles={customStyles}
              placeholder={placeholder}
              isDisabled={readOnly}
              defaultValue={defaultValue}
              name={name}
              isMulti={isMulti}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
                ClearIndicator: () => null,
              }}
              value={value}
              {...other}
            />
          </div>
          {isHasChevronDown && <FiChevronDown size={24} />}
          {suffix && suffix}
        </StyledSelectContainer>

        {error !== undefined && (
          <div tw="flex flex-row space-x-1 items-center mt-1">
            <BiErrorCircle size={12} color={'#d21c1c'} />
            <p tw="text-[#D21C1C] font-medium text-[0.75rem]">{error}</p>
          </div>
        )}
      </div>
    );
  },
);

CustomSelect.propTypes = {
  /**
   * onChange is the function that will be triggered when the
   * select input had a change and return the value of the selected option
   */
  onChange: PropTypes.func,
  /**
   * onBlur is the function that will be triggered when the
   * select input goes to blur and return the value of the selected option
   */
  onBlur: PropTypes.func,
  /**
   * value is the value of the selected options in the select input
   */
  value: PropTypes.any,
  /**
   * name is the name of the field that correspond with the form
   */
  name: PropTypes.string,
  /**
   * defaultValue is an optional default value when things first
   * rendered
   */
  defaultValue: PropTypes.any,
  /**
   * options is an array of object that has value and label, that will
   * correspond with the value selected with the corresponding label
   */
  options: PropTypes.any,
};

export default CustomSelect;

CustomSelect.displayName = 'CustomSelect';

export const StyledSelectContainer = styled.div<
  Pick<CustomSelectProps, 'disabled' | 'error' | 'readOnly'>
>`
  position: relative;
  padding: 3px 14px 2px 0px;
  border-radius: 0.75rem;
  border: 1px solid ${(props) => (props.error !== undefined ? '#D21C1C' : '#e6e6e6')};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: text;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'text')};
  background-color: ${({ disabled, readOnly }) => (disabled || readOnly ? '#F0F0F0' : '#FFFFFF')};

  &:focus-within {
    border: 1px solid #601bd0;
    background-color: #ffffff;
  }

  .react-select-container {
    background-color: #000000;
  }
`;
