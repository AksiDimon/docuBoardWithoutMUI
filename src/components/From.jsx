import s from './style.module.css';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export function Form() {

    const [data, setData] = useState({
        login: '',
        password: '',
    })

   function handleData (event) {
    const {name, value} = event.target
    // console.log(event.target)
    setData({
        ...data,
        [name]: event.target.value
    })
   }
    const [error, setError] = useState(null); // для отображения ошибок
    const navigate = useNavigate();

    
    async function handleSubmit(event) {
        event.preventDefault();
        
        // Проверяем, что логин соответствует формату "user{N}"
        const loginPattern = /^user[0-9]+$/; // шаблон для логина в формате user{N}
        if (!loginPattern.test(data.login)) {
            setError("Логин должен быть в формате user{N}, например, user1, user2...");
            return;
        }
        
        // Проверяем, что введен правильный пароль
        if (data.password !== "password") {
            setError("Неверный пароль");
            return;
        }

        // Если логин и пароль прошли проверку, отправляем данные на сервер
        return fetch('https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/login', {
                method: 'POST', // отправка информации куда то (на сервер)
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: data.login,
                    password: data.password,
                })
            })
            .then(response => {
                    // console.log(response, '||||')
                   return response.json()
            })
            .then(responseData => {
                // console.log(responseData, '±±±±')
                const token = responseData.data.token;
                // console.log(token, '§§§')
                localStorage.setItem('authToken', token);
                setError(null); // очищаем ошибки
                
                console.log("Авторизация успешна! Токен:", token === undefined ? 'Упс' : token);
                navigate('/spreadsheet')

            }, err => {
                setError("Ошибка авторизации. Проверьте логин и пароль.");
            } )
    }

    return (
        <div className={s.mainContainer} >
            <h2 style={{ textAlign: 'center', marginBottom: '40px' }} >Authorization</h2>
            <div style={{ textAlign: 'center' }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ margin: '20px' }} >
                        {/* <div style={{marginLeft: '-60px'}} > Write Login </div> */}
                        <input
                            type={'text'}
                            placeholder={'Login'}
                            name = {'login'}
                            // value = {'user1'}
                            onChange = {handleData}
                        />
                    </div>
                    <div style={{ margin: '20px' }}>
                        {/* <div style={{marginLeft: '-40px'}} > Write Password </div> */}
                        <input
                            type={'password'}
                            placeholder={'Password'}
                            name = {'password'}
                            // value = {'password'}
                            onChange = {handleData}
                        />
                    </div>
                    {error && <div style={{ color: 'red' }}>{error}</div>} {/* Сообщение об ошибке */}
                    <div style={{ margin: '20px' }}>
                        <button type = 'submit' >Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}