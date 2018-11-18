import * as React from 'react';

type WarningModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const WarningModal: React.StatelessComponent<WarningModalProps> = ({
  isVisible,
  onClose,
}) => (
  <div className={`modal ${isVisible ? 'open' : ''}`}>
    <div className="modal__body">
      <div className="modal__body__header" />

      <div className="modal__body__content">
        <p>
          Woah there, it looks like you're getting close to 1000 saved items!
          Did you know Reddit only lets you save 1000 items? Back them up now!
        </p>

        <button className="badge-button" data-testid="warningModalCloseBtn">
          Ok
        </button>
      </div>
    </div>
  </div>
);
