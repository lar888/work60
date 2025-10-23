export const initialNews = [
	{
		id: 1,
		image: "https://picsum.photos/640/480?random=1",
		date: "2025-01-05",
		description: "Researchers identify a new protein folding pathway that may explain resilience in neurodegenerative diseases."
	},
	{
		id: 2,
		image: "https://picsum.photos/640/480?random=2",
		date: "2025-01-12",
		description: "Breakthrough in cryo-EM enables visualization of ribosomes at unprecedented resolution."
	},
	{
		id: 3,
		image: "https://picsum.photos/640/480?random=3",
		date: "2025-01-20",
		description: "Discovery of lipid raft dynamics reveals new targets for cancer therapy."
	},
	{
		id: 4,
		image: "https://picsum.photos/640/480?random=4",
		date: "2025-01-28",
		description: "Biophysicists model mitochondrial ATP synthase efficiency under stress conditions."
	},
	{
		id: 5,
		image: "https://picsum.photos/640/480?random=5",
		date: "2025-02-03",
		description: "New findings on enzyme kinetics provide insights into drug resistance mechanisms."
	}
]

export const cloneInitialNews = () => initialNews.map((news) => ({ ...news }))