import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { FC, PropsWithChildren } from 'react';

export type TransitionWrapperProps = PropsWithChildren & {
  transitionKey: string;
  timeout?: { enter: number; exit: number };
  classNames?: string;
};

export const TransitionWrapper: FC<TransitionWrapperProps> = (props) => {
  const { transitionKey, timeout, classNames, children } = props;
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={transitionKey}
        timeout={timeout ?? { enter: 100, exit: 100 }}
        classNames={classNames ?? 'fade'}
      >
        {children && children}
      </CSSTransition>
    </SwitchTransition>
  );
};
