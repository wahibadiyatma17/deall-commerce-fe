import { SelectOptionProps } from '@/commons/type/input.type';
import { BaseModalProps } from '@/commons/type/modal.type';
import { ControlledSelect } from '@/components/Forms/Select';
import { ControlledTextInput } from '@/components/Forms/Text';
import { PopUpModal } from '@/components/Modals';
import React, { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { styled } from 'twin.macro';

const FilterModal: FC<BaseModalProps> = (props) => {
  const { isOpen, onClose } = props;

  const methods = useForm();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: any) => {
    onClose();
  };
  return (
    <PopUpModal
      isOpen={isOpen}
      onClose={() => onClose()}
      modalContentProps={{ bgColor: '#fff', borderRadius: '12px' }}
    >
      <PopUpModal.Body marginBottom={'24px'} paddingY={'4px'} paddingX={'20px'}>
        <StyledClassCategoryFilterModalBody>
          <div className="filter-modal__container">
            <h3 className="filter-modal__title">Product Filter</h3>
            <div className="filter-modal__content">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  tw="w-full flex flex-col gap-6"
                  id="hook-form"
                >
                  <div tw="flex flex-col w-full gap-2">
                    <label tw="font-medium text-sm">Brand</label>
                    <ControlledSelect
                      name="product_brand"
                      isMulti
                      control={control}
                      options={PRODUCT_BRAND_OPTIONS}
                      placeholder={'choose product brand'}
                    />
                  </div>
                  <div tw="flex flex-col w-full gap-2">
                    <label tw="font-medium text-sm">Product</label>
                    <ControlledSelect
                      name="product_name"
                      isMulti
                      control={control}
                      options={PRODUCT_NAME_OPTIONS}
                      placeholder={'choose product'}
                    />
                  </div>
                  <div tw="flex flex-col w-full gap-2">
                    <label tw="font-medium text-sm">Price</label>
                    <div tw="flex items-center justify-between gap-2 w-full">
                      <div tw="w-[49%]">
                        <ControlledTextInput
                          name="min_price"
                          customPrefix="$"
                          type="number"
                          control={control}
                          placeholder={'Input min price'}
                        />
                      </div>
                      <div tw="w-[49%]">
                        <ControlledTextInput
                          name="max_price"
                          customPrefix="$"
                          type="number"
                          control={control}
                          placeholder={'Input max price'}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </StyledClassCategoryFilterModalBody>
      </PopUpModal.Body>
      <PopUpModal.Footer paddingY={0} paddingX={'20px'}>
        <StyledFilterModalFooter tw="flex flex-col w-full gap-2 transition-all">
          <div className="button__reset">Reset Filter</div>
          <div className="button__apply">Apply Filter</div>
        </StyledFilterModalFooter>
      </PopUpModal.Footer>
    </PopUpModal>
  );
};

export default FilterModal;

const StyledClassCategoryFilterModalBody = styled.div`
  width: 100%;
  .filter-modal__container {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 53px;
  }

  .filter-modal__title {
    color: #555555;
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    text-transform: capitalize;
  }

  .filter-modal__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    align-self: stretch;
  }

  .filter-modal__content-box {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    h6 {
      color: #fff;
      font-family: Obvia;
      font-size: 20px;
      font-style: normal;
      font-weight: 900;
      line-height: normal;
    }

    .content-list {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      align-items: flex-start;
      gap: 8px;
    }
  }
`;

const StyledFilterModalFooter = styled.div`
  .button__reset {
    display: flex;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    cursor: pointer;
    &:hover {
      transform: scale(1.04);
    }

    color: #601bd0;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: capitalize;
  }

  .button__apply {
    display: flex;
    height: 48px;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    border-radius: 12px;
    background: #601bd0;
    cursor: pointer;
    &:hover {
      transform: scale(1.04);
    }

    color: #fff;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: capitalize;
  }
`;

const PRODUCT_BRAND_OPTIONS = [
  {
    label: 'Apple',
    value: 'Apple',
  },
  {
    label: 'Samsung',
    value: 'Samsung',
  },
  {
    label: 'OPPO',
    value: 'OPPO',
  },
  {
    label: 'Huawei',
    value: 'Huawei',
  },
  {
    label: 'Infinix',
    value: 'Infinix',
  },
  {
    label: 'Microsoft Surface',
    value: 'Microsoft Surface',
  },
  {
    label: 'HP Pavilion',
    value: 'HP Pavilion',
  },
  {
    label: 'Impression of Acqua Di Gio',
    value: 'Impression of Acqua Di Gio',
  },
  {
    label: 'Hemani Tea',
    value: 'Hemani Tea',
  },
  {
    label: 'Fair & Clear',
    value: 'Fair & Clear',
  },
  {
    label: 'Fog Scent Xpressio',
    value: 'Fog Scent Xpressio',
  },
  {
    label: 'Saaf & Khaas',
    value: 'Saaf & Khaas',
  },
  {
    label: 'Boho Decor',
    value: 'Boho Decor',
  },
  {
    label: 'Golden',
    value: 'Golden',
  },
] as Array<SelectOptionProps>;

const PRODUCT_NAME_OPTIONS = [
  {
    label: 'IPhone 9',
    value: 'IPhone 9',
  },
  {
    label: 'IPhone X',
    value: 'IPhone X',
  },
  {
    label: 'Samsung Universe 9',
    value: 'Samsung Universe 9',
  },
  {
    label: 'OPPO F19',
    value: 'OPPO F19',
  },
  {
    label: 'Huawei P30',
    value: 'Huawei P30',
  },
  {
    label: 'MacBook Pro',
    value: 'MacBook Pro',
  },
  {
    label: 'Samsung Galaxy Book',
    value: 'Samsung Galaxy Book',
  },
  {
    label: 'Microsoft Surface Laptop 4',
    value: 'Microsoft Surface Laptop 4',
  },
  {
    label: 'Infinix INBOOK',
    value: 'Infinix INBOOK',
  },
  {
    label: 'HP Pavilion 15 DK1056WM',
    value: 'HP Pavilion 15 DK1056WM',
  },
];
