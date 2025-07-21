const table = document.querySelector('table#definitions>tbody');

await fetch('words.json')
	.then(r => r.json())
	.then(d => d.forEach(addDef));

// custom word additions

function addDef(def) {
	const row = document.createElement('tr')
		, en = row.appendChild(document.createElement('td'));
	en.textContent = def.en;
	const ar = row.appendChild(document.createElement('td'));
	ar.textContent = def.ar;
	ar.setAttribute('phonetic', def.phonetic);
	if (def.dz) {
		const dz = row.appendChild(document.createElement('td'));
		dz.textContent = def.dz;
	}

	table.appendChild(row);
}

const search = document.querySelector('input[type="search"]');

search.addEventListener('input', function() {
	const defs = Array.from(table.querySelectorAll('tr'));
	for (const def of defs)
		def.removeAttribute('hidden');

	if (this.value.length < 1) return;
	const query = this.value.toLowerCase()
		, filtered = defs.filter(def => {
			const includes = def.textContent.toLowerCase().includes(query);
			return includes;
		});

	for (const def of defs.filter(def => !filtered.includes(def)))
		def.toggleAttribute('hidden', true);
});