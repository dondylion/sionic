import React from 'react';

export default function Footer () {
    const google = <img src={require('../../Images/GooglePlay.png')} alt={"Google Play"} className="app"/>;
    const apple = <img src={require('../../Images/AppStore.png')} alt={"App Store"} className="app"/>;
    const facebook = <img src={require('../../Images/Facebook.png')} alt={"Facebook"} className="social"/>;
    const vk = <img src={require('../../Images/Vk.png')} alt={"VK"} className="social"/>;
    const inst = <img src={require('../../Images/Inst.png')} alt={"Instagram"} className="social"/>;

    return (
        <footer>
            <div className='footer-top flex-row between'>
                <div className='react-logo'>React</div>
                <div className='links flex-row'>
                    <div>
                        <span>Присоединяйтесь к нам</span>
                        <div className='flex-row app-links social-links between'>
                            {facebook}
                            {vk}
                            {inst}
                        </div>
                    </div>
                    <div>
                        <span>Устанавливайте приложение</span>
                        <div className="flex-row app-links between">
                            {google}
                            {apple}
                        </div>
                    </div>
                </div>
            </div>
            <div className='footer-bottom w-full'>
                <span>&#169; Sionic</span>
                <span>Правовая информация</span>
                <span>Политика конфиденциальности</span>
            </div>
        </footer>
    );
}