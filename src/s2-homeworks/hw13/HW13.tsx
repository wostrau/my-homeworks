import React, {useState} from 'react'
import axios from 'axios'

import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import s2 from '../../s1-main/App.module.css'
import s from './HW13.module.css'

import success200 from './images/200.svg'
import error400 from './images/400.svg'
import error500 from './images/500.svg'
import errorUnknown from './images/error.svg'

/*
* 1 - дописать функцию send
* 2 - дизэйблить кнопки пока идёт запрос
* 3 - сделать стили в соответствии с дизайном
* */

const HW13 = () => {
    const [isFetching, setIsFetching] = useState<boolean>(false)

    const [code, setCode] = useState('')
    const [text, setText] = useState('')
    const [info, setInfo] = useState('')
    const [image, setImage] = useState('')

    const send = (x?: boolean | null) => () => {
        const url =
            x === null
                ? 'https://xxxxxx.ccc' // имитация запроса на не корректный адрес
                : 'https://incubator-personal-page-back.herokuapp.com/api/3.0/homework/test'

        setCode('')
        setImage('')
        setText('')
        setInfo('...loading')
        setIsFetching(true)

        axios
            .post(url, {success: x})
            .then((res) => {
                console.log(res)
                setCode('code 200!')
                setImage(success200)
                // дописать
                setText('success!')
                setInfo('everything already loaded')
                setIsFetching(false)
            })
            .catch((error) => {
                setIsFetching(false)
                if (error.status === 400) {
                    setCode('code 400!')
                    setImage(error400)
                    setText('Bad Request')
                    setInfo('Bad Request')
                    console.log('Bad Request')
                } else if (error.status === 500) {
                    setCode('code 500!')
                    setImage(error500)
                    setText('Server Error')
                    setInfo('Server Error')
                    console.log('Server Error')
                } else {
                    setCode('code unknown')
                    setImage(errorUnknown)
                    setText('Unknown Error')
                    setInfo('Unknown Error')
                    console.log('Unknown Error')
                }
                // дописать
            })
    }

    return (
        <div id={'hw13'}>
            <div className={s2.hwTitle}>Homework #13</div>

            <div className={s2.hw}>
                <div className={s.buttonsContainer}>
                    <SuperButton
                        id={'hw13-send-true'}
                        onClick={send(true)}
                        xType={'secondary'}
                        // дописать
                        disabled={isFetching}

                    >
                        Send true
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-false'}
                        onClick={send(false)}
                        xType={'secondary'}
                        // дописать
                        disabled={isFetching}

                    >
                        Send false
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-undefined'}
                        onClick={send(undefined)}
                        xType={'secondary'}
                        // дописать
                        disabled={isFetching}

                    >
                        Send undefined
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-null'}
                        onClick={send(null)} // имитация запроса на не корректный адрес
                        xType={'secondary'}
                        // дописать
                        disabled={isFetching}

                    >
                        Send null
                    </SuperButton>
                </div>

                <div className={s.responseContainer}>
                    <div className={s.imageContainer}>
                        {image && <img src={image} className={s.image} alt="status"/>}
                    </div>

                    <div className={s.textContainer}>
                        <div id={'hw13-code'} className={s.code}>
                            {code}
                        </div>
                        <div id={'hw13-text'} className={s.text}>
                            {text}
                        </div>
                        <div id={'hw13-info'} className={s.info}>
                            {info}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HW13
