import WrenchImg from './wrench.svg';
import AvatarImg from './avatar.svg';
import styles from './header.module.scss';

const Header = (): JSX.Element => {
	
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<img src={WrenchImg} alt="wrench" />
				<span>Wrench CRM</span>
			</div>
			<div className={styles.user}>
				<img src={AvatarImg} alt="avatar" />
				<span>Имя Фамилия</span>
			</div>
		</header>
	);
};

export default Header;
