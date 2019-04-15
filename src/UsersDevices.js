import React, { Component } from 'react';
import users from './users';
import devices from './devices';

class UsersDevices extends Component {
    /** Стейт приложения со следующими свойствами:
     * isUsersBlockActive - флаг активной вкладки Пользователи
     * isDevicesBlockActive - флаг активной вкладки Устройства
     * users - массив пользователей
     * devices - массив устройств
     * selectedUsersQty - кол-во выбранных пользователей
     **/
    state = {
        isUsersBlockActive: true,
        isDevicesBlockActive: false,
        users: [],
        devices: [],
        selectedUsersQty: 0
    }

    /** Компонент жизненного цикла приложения, получающий при его загрузке с сервера или со статического файла  с json 
      * данные о пользователях и устройствах, записывающий полученные массивы с данными в соответствующие свойства стейта.
     **/
    componentDidMount() {
        this.fetchUsers().then(users => this.setState({users}));
        this.fetchDevices().then(devices => this.setState({devices}));
    }

    /** Метод получения пользователей из соответсвующего массива с данными **/
    fetchUsers = async () => {
        return new Promise((resolve, reject) => {
        resolve(users);
        });
    };

    /** Метод получения устройств из соответсвующего массива с данными **/
    fetchDevices = async () => {
        return new Promise((resolve, reject) => {
        resolve(devices);
        });
    };

    /** Метод получения кол-ва выбранных пользователей **/
    getSelectedUsersQty() {
        return this.getSelectedUsers().length;
    }

    /** Метод получения  выбранных пользователей **/
    getSelectedUsers() {
        return this.state.users.filter(user => user.showDev === true);
    }

    /** Метод переключения на вкладку Пользователи **/
    showUsersBlock() {
        this.setState({isUsersBlockActive: true, isDevicesBlockActive: false });
    }

    /** Метод переключения на вкладку Устройства **/
    showDevicesBlock() {
        this.setState({isUsersBlockActive: false, isDevicesBlockActive: true});
    }

    /** Метод обработки выбора пользователя **/
    userCheckedHandler(ev, userId) {
        const {users} = this.state;
        users[userId].showDev = !users[userId].showDev;
        this.setState({users});
        const selectedUsersQty = this.getSelectedUsersQty();
        this.setState({selectedUsersQty});
    }   

    /** Метод отображения пользователя **/
    renderUser() {
        const users = this.state.users;
        return users.map(user => <li key={user.id}><input type="checkbox" checked={user.showDev} onChange={(ev) => this.userCheckedHandler(ev, user.id)}/>{user.first_name + ' ' + user.last_name}</li>)
    }

    /** Метод установки устройств выбранному пользователю **/
    setUserDevices(ev, sn) {
        const selectedUserId = this.getSelectedUsers()[0].id;
        const {users} = this.state;
        users.forEach(user => user.id === selectedUserId ? user.devices.push(sn) : '');
        this.setState({users});
    }

    /** Метод проверки на занятость серийного номера устройства пользователями **/
    isSnBuzy(sn) {
        return this.state.users.some(user => user.devices.includes(sn) ? true : false);
    }

    /** Метод получения списка устройств системы **/
    getDevicesList() {
        const devices = this.state.devices;
        const selectedUser = this.getSelectedUsers()[0];
        return devices.map(dev => <li key={dev.sn}><input type="checkbox" checked={selectedUser.devices.includes(dev.sn)} disabled={this.isSnBuzy(dev.sn)} onChange={(ev) => this.setUserDevices(ev, dev.sn)}/>{dev.name}</li>)
    }

    /** Метод редактирования имени устройства **/
    editDevName(ev, sn, devOldName) {
        const devNewName = ev.target.value;
        const devicesSource = this.state.devices;
        let device = devicesSource.map(dev => dev.sn === sn ? dev.name = devNewName : dev.name = dev.name);
        this.setState({devices});
    }   

    /** Метод получения наименований устройств пользователя по серийному номеру устройства **/
    getUserDevicesNamesBySn(sn) {
        const usersDevices = this.state.devices.filter(dev => dev.sn === sn);
        return  usersDevices.map(device => <li key={device.sn}><input type="text" value={device.name} onChange={(ev) => this.editDevName(ev, device.sn, device.name)}/></li>);
    }

    /** Метод отображения устройств пользователя **/
    renderUserDevices() {
        const users = this.state.users.filter(user => user.showDev === true);
        let unitedDevices = [];
        users.forEach(user => {
            unitedDevices = unitedDevices.concat(user.devices);
        });
        unitedDevices = this.unique(unitedDevices);
        return unitedDevices.map(sn => this.getUserDevicesNamesBySn(sn));
    }
    
    /** Метод получения уникальных значений массива - можно вынести в отдельный файл папки Helpers или Utils **/
    unique(arr) {
        var a = arr.concat();
        for(var i = 0; i < a.length; ++i) {
            for(var j = i + 1; j < a.length; ++j) {
                if(a[i] === a[j])
                    a.splice(j--, 1);
            }
        }
        return a;
    };

    /** Компонент ЖЦ приложения, отвечающий за отображение содержимого данной страницы **/
    render() {
        
        /** Получение необходимых свойств из стейта **/
        const {isUsersBlockActive, isDevicesBlockActive, selectedUsersQty} = this.state;
       
        /** Основная верстка страницы **/
        return (
            <div className="calculatedInput">
                <div className="input-group mb-3">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className="nav-link active" href="#" onClick={() => this.showUsersBlock()}>Пользователи</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => this.showDevicesBlock()}>Устройства</a>
                        </li>
                    </ul>
                </div>
                {isUsersBlockActive && <ul className="users-list">
                    {this.renderUser()}
                    <h2 className='red'>Устройства системы</h2>
                    {selectedUsersQty === 1 && this.getDevicesList()}
                </ul> }
                {isDevicesBlockActive &&
                <ul className="devices-list">
                    {this.renderUserDevices()}
                </ul>}
            </div>
            
        );
    }
}

export default UsersDevices;
