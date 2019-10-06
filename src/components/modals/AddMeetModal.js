import React from 'react';
import {
    ModalPage, ModalPageHeader, HeaderButton,
    FormLayout,
    Input, Textarea, Checkbox,
    Button, Link, Spinner,
    IS_PLATFORM_IOS,
    Snackbar, Avatar
} from "@vkontakte/vkui";

import Icon16Done from '@vkontakte/icons/dist/16/done';
import Icon16Cancel from '@vkontakte/icons/dist/16/cancel';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import { getMessage } from '../../js/helpers';

const meetExaple = {
    id: null,
    name: '',
    description: ''
};

class AddMeetModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            disabled: false,
            snackbar: null,
            ...meetExaple
        }

        this.onChange = this.onChange.bind(this);
        this.AddMeet = this.AddMeet.bind(this);
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

    AddMeet = async () => {
        const { api, onClose } = this.props;
        
        this.setState({ disabled: true });

        const { success, failed } = await api.AddMeet({
            id: this.state.id,
            name: this.state.name,
            description: this.state.description
        });

        if (success) {
            this.setState({ 
                snackbar: <Snackbar
                            duration={1500}
                            onClose={() => this.setState({ snackbar: null })}
                            before={<Avatar size={24} style={{ background: 'var(--dynamic_green)' }}>
                                <Icon16Done fill="#fff" width={14} height={14} /></Avatar>}
                        >{ getMessage('add_meet_success') }</Snackbar>
            });
            
            setTimeout(onClose, 1600);
        } else {
            this.setState({ 
                disabled: false,
                snackbar: <Snackbar
                            duration={1500}
                            onClose={() => this.setState({ snackbar: null })}
                            before={<Avatar size={24} style={{ background: 'var(--dynamic_red)' }}>
                                <Icon16Cancel fill="#fff" width={14} height={14} /></Avatar>}
                        >{failed}</Snackbar>
            });
        }
    }

    render() {
        const onChange = this.onChange;
        const { onClose } = this.props;
        const { name, description, id, disabled } = this.state;
        const formLang = getMessage('forms');

        return (
            <>
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
                    <Button size="xl" disabled={disabled} onClick={ () => this.AddMeet() }>
                        { disabled ? <Spinner /> : formLang.add }
                    </Button>
                </FormLayout>

                
            </ModalPage>
            {this.state.snackbar}
            </>
        );
    }
}

export default AddMeetModal;