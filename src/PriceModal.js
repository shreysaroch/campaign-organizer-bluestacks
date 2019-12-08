import React from 'react'
import {Modal, Image, Header, Grid, Button} from 'semantic-ui-react';

const PriceModal = (props) => {
    return (
        <>
<Modal open={props.showModal} onClose={props.handleClose} size={'tiny'}>
    <Modal.Content image>
      <Image wrapped size='small' src={props.data.thumbnail} />
      <Modal.Description>
    <Header>{props.data.name}</Header>
        <p>
          {props.data.region}
        </p>
      </Modal.Description>
    </Modal.Content>
    <Modal.Content>
        <h3>Price</h3>
        <Grid divided='vertically'>
            { props.data && props.data.price &&
            props.data.price.map(item => {
                return (
                <Grid.Row columns={2} key={item.tag}>
                    <Grid.Column>
                    <span>{item.tag}</span>
                    </Grid.Column>
                    <Grid.Column>
                    <span>{item.actualPrice}</span>
                    </Grid.Column>
                </Grid.Row>
                )
            })
        }
        </Grid>
    </Modal.Content>
    <Modal.Actions className={'center-align'}>
            <Button onClick={props.handleClose} basic>Close</Button>
    </Modal.Actions>
  </Modal>
  </>
    )
}

export default PriceModal;