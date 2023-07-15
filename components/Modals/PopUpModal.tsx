import React from 'react';
import * as PropTypes from 'prop-types';
import { IoIosClose } from 'react-icons/io';
import 'twin.macro';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalContentProps,
} from '@chakra-ui/react';
import { getChildrenOnDisplayName } from '@/commons/utils';

interface BasePopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: any;
  initialFocusRef?: React.RefObject<FocusableElement>;
  size?: string;
  modalContentProps?: ModalContentProps;
  id?: string;
}

export type PopupModalProps = BasePopupModalProps;

const PopUpModal = ({
  children,
  isOpen,
  initialFocusRef,
  onClose,
  modalContentProps,
  size: sizeProps,
  id: modalId,
}: PopupModalProps) => {
  const title = getChildrenOnDisplayName(children, 'Title');
  const body = getChildrenOnDisplayName(children, 'Body');
  const footer = getChildrenOnDisplayName(children, 'Footer');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={sizeProps}
      initialFocusRef={initialFocusRef}
      id={modalId}
    >
      <ModalOverlay />
      <ModalContent tw="py-2 flex items-center mx-4 relative" {...modalContentProps}>
        <div tw="absolute right-2 top-2 cursor-pointer" onClick={() => onClose()}>
          <IoIosClose size={28} />
        </div>
        {title}
        {body}
        {footer}
      </ModalContent>
    </Modal>
  );
};

interface BasePopUpModalSubcomponentProps {
  children: any;
}

export type PopUpModalSubcomponentProps = BasePopUpModalSubcomponentProps;

const Title = ({ children, ...other }: PopUpModalSubcomponentProps & ModalHeaderProps) => (
  <ModalHeader tw="w-full" {...other}>
    {children}
  </ModalHeader>
);
Title.displayName = 'Title';
PopUpModal.Title = Title;

const Body = ({ children, css = [], ...other }: PopUpModalSubcomponentProps & ModalBodyProps) => (
  <ModalBody tw="w-full" css={css} {...other}>
    {children}
  </ModalBody>
);
Body.displayName = 'Body';
PopUpModal.Body = Body;

const Footer = ({
  children,
  css = [],
  ...other
}: PopUpModalSubcomponentProps & ModalFooterProps) => (
  <ModalFooter tw="w-full" css={css} {...other}>
    {children}
  </ModalFooter>
);
Footer.displayName = 'Footer';
PopUpModal.Footer = Footer;

PopUpModal.propTypes = {
  /**
   * Children is required to be passed in Card. Need to have
   * <Card.Header> and/or <Card.Body> in it
   */
  children: PropTypes.node.isRequired,
};

export default PopUpModal;

interface FocusableElement {
  focus(options?: FocusOptions): void;
}
