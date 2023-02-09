import { FC } from 'react';
import { rootStore } from '../stores/RootStore';
import { observer } from 'mobx-react';
export const ThemeToggle: FC = observer(() => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <button
        aria-label="Toggle theme"
        className="theme-toggle border-0 d-inline fit-content rounded-pill px-2 position-relative"
        style={{ cursor: 'pointer' }}
        onClick={() => rootStore.themeStore.toggleTheme()}
      >
        <span>
          <i className="icon fa fa-moon-o" style={{ color: 'lightgreen' }} />
          <i className="icon fa fa-sun-o text-warning ms-2" />
          <div className={`ball ${rootStore.themeStore.isLight ? '' : 'translated'}`}></div>
        </span>
      </button>
    </div>
  );
});
