import React, { useContext, useEffect, useState } from 'react';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import Loading from '../../../../components/Loading/Loading';
import Modal from '../../../../components/Modal/Modal';
import Select from '../../../../components/Select/Select';
import { useApi } from '../../../../hooks/useApi';
import { createUser } from '../../../../services/user.service';
import { ContextUser } from '../../context/ContextUser';
import { Types } from '../../context/user.reducer';
import './userModal.scss';

const UserModal: React.FC = () => {
  const { state, dispatch } = useContext(ContextUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [role, setRole] = useState<any>(null);
  const [userResponse, callEndpoint] = useApi();

  const { modal } = state?.list;

  const onClose = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setUsername('');
    setRole(null);
    dispatch({
      type: Types.SetModal,
      payload: {
        active: false,
        mode: 'add',
        data: null,
      },
    });
  };

  const onSave = () => {
    const user = {
      firstName,
      lastName,
      email,
      password,
      username,
      role: role?.value,
    };
    setLoading(true);
    callEndpoint(createUser(user));
  };

  useEffect(() => {
    if (loading && userResponse?.data) {
      onClose();
      dispatch({
        type: Types.SetTable,
        payload: {
          data: null,
          loading: false,
        },
      });
    }
  }, [userResponse]);

  return (
    <Modal
      active={modal?.active && modal?.mode === 'add'}
      title="Registrar usuario"
      onClose={onClose}
    >
      {loading && <Loading />}
      <section className="userModal">
        <div className="userModal__groupFields">
          <Input
            className="userField"
            label="Nombres"
            type="text"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
          <Input
            className="userField"
            label="Apellidos"
            type="text"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
        </div>
        <div className="userModal__groupFields">
          <Input
            className="userField"
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <Input
            className="userField"
            label="Contraseña"
            type="text"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div className="userModal__groupFields">
          <Input
            className="userField"
            label="Usuario"
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <Select
            className="userField"
            label="Rol"
            placeholder="Selecciona un rol"
            options={[
              { label: 'Administrador', value: 'ROLE_ADMIN' },
              { label: 'Usuario', value: 'ROLE_USER' },
            ]}
            value={role}
            onChange={(newValue) => {
              setRole(newValue);
            }}
          />
        </div>
        <div className="userModal__buttons">
          <Button
            buttonType="secondary"
            className="itemButton"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button buttonType="primary" className="itemButton" onClick={onSave}>
            Registrar
          </Button>
        </div>
      </section>
    </Modal>
  );
};

export default UserModal;
