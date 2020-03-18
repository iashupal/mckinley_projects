import React from 'react';
import ContentCard from 'components/ContentCard';
import AlignBox from 'components/AlignBox';
import Heading from 'components/Heading';
import Button from 'components/Button';
import { withStyles } from '@material-ui/core/styles';
import Box from 'components/BoxOld';
import { Icon } from '@material-ui/core';

function AgendaPopup({ classes, date }) {
  return (
    <div className={classes.agendaWrapper}>
      <ContentCard
        border="1px solid lightgray"
        title="Agenda"
        contents={[
          <div>
            <AlignBox pb={2}>
              <AlignBox>
                <Icon style={{ fontSize: '20px' }}>alarm</Icon>
                <Heading padding="0 10px" fontSize="15px">
                  Date : {date}
                </Heading>
                <Button color="danger" size="small">
                  <Box pl={2} pr={2}>
                    Timer
                  </Box>
                </Button>
              </AlignBox>
            </AlignBox>
            <AlignBox pb={2}>
              <AlignBox>
                <Icon style={{ fontSize: '20px' }}>account_circle</Icon>
                <Heading padding="0 10px" fontSize="15px">
                  Date : {date}
                </Heading>
              </AlignBox>
            </AlignBox>
            <AlignBox pb={2}>
              <AlignBox>
                <Icon style={{ fontSize: '20px' }}>description</Icon>
                <Heading padding="0 10px" fontSize="15px">
                  Profile
                </Heading>
              </AlignBox>
            </AlignBox>
            <AlignBox pb={2}>
              <AlignBox>
                <Icon style={{ fontSize: '20px' }}>folder_open</Icon>
                <Heading padding="0 10px" fontSize="15px">
                  Description
                </Heading>
              </AlignBox>
            </AlignBox>
            <AlignBox>
              <AlignBox>
                <Button color="primary" size="small">
                  <Box pl={2} pr={2}>
                    Timer
                  </Box>
                </Button>
                <Button color="inverted" size="small">
                  <Box pl={2} pr={2}>
                    Timer
                  </Box>
                </Button>
              </AlignBox>
              <Button color="danger" size="small">
                <Box pl={2} pr={2}>
                  Timer
                </Box>
              </Button>
            </AlignBox>
          </div>,
        ]}
      />
    </div>
  );
}
const styles = theme => ({
  agendaWrapper: {
    width: '400px',
    position: 'absolute',
    top: '35%',
    left: '35%',
    zIndex: 10,
  },
});
export default withStyles(styles)(AgendaPopup);
