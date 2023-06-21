import { useCallback, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { MainContentContainer } from './components/mainContent/MainContentContainer';
import { HeaderNav } from './components/nav/header/HeaderNav';
import { MainMenuContainer } from './components/nav/mainMenu/MainMenuContainer';

const useStyles = createUseStyles({
  App: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  header: {
    backgroundColor: '#dc0032',
    color: '#fff',
    width: '100%',
    position: 'sticky',
    top: 0,
    zIndex: '9999'
  },
  mainContainer: {
    display: 'flex',
    height: '100%'
  }
})

export interface SelectedContent {
  readonly selectedContentId: string | null;
}

export const App = (() => {

  const classes = useStyles();


  const [selectedContent, setSelectedContent] = useState<SelectedContent | null>(null);

  const handlerSelectedContent = useCallback((selectedContentId: SelectedContent | null) => {
    setSelectedContent(selectedContentId);
  },
    [setSelectedContent]
  );

  return (
    <div className={classes.App}>
      <header className={classes.header}>
        <HeaderNav />
      </header>

      <div className={classes.mainContainer}>

        <MainMenuContainer
          selectedContent={handlerSelectedContent}
        />

        {selectedContent != null &&
          <MainContentContainer
            selectedContent={selectedContent}
          />
        }

      </div>
    </div>
  );
});
