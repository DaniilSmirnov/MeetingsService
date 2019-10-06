import React from 'react';
import {
    ModalPage, ModalPageHeader, HeaderButton,
    FormLayout,
    Input, Textarea, Checkbox,
    Button, Link,
    IS_PLATFORM_IOS
} from "@vkontakte/vkui";

import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import { getMessage } from '../../js/helpers';

class AddMeetModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: ''
        }

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        const { edit } = this.props;

        if (edit) {
            this.setState({ ...edit });
        }
    }

    onChange = (e) => {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value });
    }

    render() {
        const onChange = this.onChange;

        const { onClose } = this.props;
        const { name, description, id } = this.state;
        const formLang = getMessage('forms');

        return (
            <ModalPage
                id="add-meet-modal"
                header={
                    <ModalPageHeader
                        left={!IS_PLATFORM_IOS &&
                        <HeaderButton onClick={ onClose }><Icon24Cancel/></HeaderButton>}
                        right={IS_PLATFORM_IOS &&
                        <HeaderButton onClick={ onClose }><Icon24Dismiss/></HeaderButton>}
                    >
                        { getMessage(id ? 'edit_meet_modal' : 'add_meet_modal') }
                    </ModalPageHeader>
                }
                onClose={ onClose }
                settlingHeight={ 100 }
            >
                <FormLayout>
                    <Input
                        type="text"
                        top={ formLang.name }
                        name="name"
                        value={name}
                        onChange={ onChange }
                    />

                    <Textarea
                        top={ formLang.description }
                        name="description"
                        value={ description }
                        onChange={ onChange }
                    />
                    
                    <Checkbox>Согласен со всем <Link>этим</Link></Checkbox>
                    <Button size="xl">{ formLang.add }</Button>
                </FormLayout>
            </ModalPage>
        );
    }
}

export default AddMeetModal;