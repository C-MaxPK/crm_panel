import { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { clearDaData, getDaDataAddress, selectDaData } from './searchSlice';
import SearchImg from './search.svg';
import styles from './search.module.scss';

const Search = (): JSX.Element => {
	const [ inputValue, setInputValue ] = useState<string>('');
	const [ errorFlg, setErrorFlg ] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const daData = useAppSelector(selectDaData);

	useEffect(() => {
		return () => {
			dispatch(clearDaData());
		}
	}, [dispatch]);

	const searchAddress = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		setInputValue('');
		
		if (inputValue.length >= 3) {
			dispatch(getDaDataAddress(inputValue));
			setErrorFlg(false);
		} else {
			dispatch(clearDaData());
			setErrorFlg(true);
		}
	};

	return (
		<main>
			<h2 className={styles.title}>Поиск адресов</h2>
			<span>Введите интересующий вас адрес</span>

			<form className={styles.form} onSubmit={e => searchAddress(e)}>
				<input
					className={styles.input}
					type="text"
					placeholder='Введите интересующий вас адрес'
					value={inputValue}
					onChange={e => setInputValue(e.target.value)}
				/>
				<button className={styles.searchBtn}>
					<img src={SearchImg} alt="search" />
					<span>Поиск</span>
				</button>
			</form>

			{errorFlg && <div className={styles.error}>Минимальная длина запроса: 3 символа</div>}

			{daData && <section className={styles.response}>
				<h2 className={styles.responseTitle}>Адреса</h2>
				{daData.length > 0 ?
					<ul>
						{daData.map(address => (
							<li key={address.value}>
								{address.value}
							</li>
						))}
					</ul>
					:
					<div>Не найдено</div>
				}
			</section>}
		</main>
	);
};

export default Search;
