import * as React from 'react';
import { withStyles, Theme, StyleRules } from '@material-ui/core/styles';
import Grid, { GridClassKey, GridProps } from '@material-ui/core/Grid';
import AudioPlay from 'components/chat/AudioPlay';
import { Props } from './Main.d';

class Main extends React.Component<Props, {}> {
  private grid: GridProps;

  componentDidUpdate(prevProps: Props, prevState: any) {
    const div: HTMLDivElement = document.getElementById('chat_main') as HTMLDivElement;

    div.scrollIntoView({
      block: 'end',
    });
  }

  render() {
    const { media = [], classes } = this.props;

    return (
      <Grid
        id="chat_main"
        container
        direction="column"
        classes={{ container: classes.root }}
      >
        {(() => {
          return media.map((item: Media, index: number) => (
            <AudioPlay media={item} key={index} />
          ));
        })()}
      </Grid>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
  root: {
    overflowY: 'scroll',
    flexWrap: 'nowrap',
    maxHeight: 'calc(100vh - 40px)',
  },
});

export default withStyles(styles)(Main);