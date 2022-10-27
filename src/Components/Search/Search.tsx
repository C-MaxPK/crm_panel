import { FormEvent, useState } from 'react';
import { DaDataSuggestion } from './types';
import SearchImg from './search.svg';
import styles from './search.module.scss';

interface IResponse {
	suggestions: DaDataSuggestion[];
}

const Search = (): JSX.Element => {
	const [ inputValue, setInputValue ] = useState<string>('');
	const [ daData, setDaData ] = useState<DaDataSuggestion[] | null>(null);
	const [ errorFlg, setErrorFlg ] = useState<boolean>(false);

	const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
	const token = "6fbad274991f4f4a9543cd3198f4c5a93c73666d";

	const searchAddress = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		setInputValue('');
		setDaData(null);

		if (inputValue.length >= 3) {
			setErrorFlg(false);
			fetch(url, {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Authorization": "Token " + token
				},
				body: JSON.stringify({query: inputValue, count: 12})
			})
				.then(response => response.json() as Promise<IResponse>)
				.then(result => setDaData(result.suggestions))
				.catch(error => console.log("error", error.message));
		} else {
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
