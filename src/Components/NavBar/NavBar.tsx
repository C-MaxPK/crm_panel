import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import ArrowUpImg from './arrow-up.svg';
import styles from './navBar.module.scss';

interface IMenu {
	urlImg: string;
	title: string;
	url: string;
}

const NavBar = (): JSX.Element => {
	const { pathname } = useLocation();
	const [ settingMenuShow, setSettingMenuShow ] = useState<boolean>(false);
	const [ showMenu, setShowMenu ] = useState<boolean>(false);
	
	const menuList: IMenu[] = [
		{urlImg: './icon/home.svg', title: 'Главная', url: '/'},
		{urlImg: './icon/search.svg', title: 'Поиск адресов', url: '/address'},
		{urlImg: './icon/table.svg', title: 'Таблицы', url: '/table'},
		{urlImg: './icon/calendar.svg', title: 'Календарь', url: '/calendar'},
		{urlImg: './icon/map.svg', title: 'Карты', url: '/map'},
		{urlImg: './icon/widget.svg', title: 'Виджеты', url: '/widget'},
		{urlImg: './icon/setting.svg', title: 'Настройки', url: '/setting'},
		{urlImg: './icon/exit.svg', title: 'Выход', url: '/exit'}
	];

	const settingList: IMenu[] = [
		{urlImg: './icon/setting-profile.svg', title: 'Настройки профиля', url: '/setting/profile'},
		{urlImg: './icon/setting-financial.svg', title: 'Управление финансами', url: '/setting/financial'}
	];

	return (
		<>
			<nav className={cn(styles.nav, {[styles.navShow]: showMenu})}>
				<div className={styles.title}>Меню</div>
				<div className={styles.menuClose} onClick={() => setShowMenu(false)}>Х</div>

				<ul>
					{menuList.map(menuItem => (
						<li className={styles.menuItem} key={menuItem.title}>
							{menuItem.title === 'Настройки' ?
								(<div>
									<div className={styles.setting} onClick={() => setSettingMenuShow(prevState => !prevState)}>
										<img src={menuItem.urlImg} alt={menuItem.title} />
										{menuItem.title}
										<img
											className={cn(styles.arrowUp, {[styles.arrowDown]: settingMenuShow})}
											src={ArrowUpImg}
											alt='развернуть'
										/>
									</div>

									<ul className={cn({[styles.settingList]: settingMenuShow})}>
										{settingList.map(settingItem => (
											<li className={cn(styles.menuItem, styles.settingItem)} key={settingItem.title}>
												<Link to={settingItem.url} className={styles.settingLink}>
													<img src={settingItem.urlImg} alt={settingItem.title} />
													{settingItem.title}
												</Link>
												<div className={cn({[styles.menuItem__active]: pathname === settingItem.url})}></div>
											</li>
										))}
									</ul>

								</div>)
								:
								(<Link to={menuItem.url}>
									<img src={menuItem.urlImg} alt={menuItem.title} />
									{menuItem.title}
								</Link>)
							}
							<div className={cn({[styles.menuItem__active]: pathname === menuItem.url})}></div>
						</li>
					))}
				</ul>

			</nav>
			{!showMenu && <div className={styles.menuBtn} onClick={() => setShowMenu(prevState => !prevState)}>Меню</div>}
		</>
	);
};

export default NavBar;
