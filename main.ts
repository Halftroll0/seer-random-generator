import { Plugin, Editor, MarkdownView } from "obsidian";

export default class SeerRandomGenerator extends Plugin {
	statusBarText: HTMLSpanElement;

	async onload() {
		this.statusBarText = this.addStatusBarItem().createEl("span");
		this.statusBarText.textContent = "Seer is watching.";

		// Register an event listener for editor changes
		this.registerEvent(
			this.app.workspace.on(
				"editor-change",
				this.handleEditorChange.bind(this)
			)
		);
	}

	onunload() {
		// Remove the status bar text
		if (this.statusBarText) {
			this.statusBarText.remove();
		}

		// Unregister any other resources if needed
		console.log("SeerRandomGenerator plugin unloaded.");
	}

	// Function to handle editor changes
	handleEditorChange(editor: Editor) {
		const keyphrase = ":gn"; // Updated keyphrase to :gn
		const cursor = editor.getCursor();
		const line = editor.getLine(cursor.line);

		if (line.includes(keyphrase)) {
			const randomName = this.generateRandomName();
			const updatedLine = line.replace(keyphrase, randomName);
			editor.setLine(cursor.line, updatedLine);
		}
	}

	// Function to generate a random fantasy name
	generateRandomName(): string {
		const prefixes = [
			"Ar",
			"El",
			"Fa",
			"Gal",
			"Ka",
			"Lor",
			"My",
			"Thal",
			"Va",
			"Zar",
			"Tor",
			"Bel",
			"Nym",
			"Eri",
			"Syl",
			"Fen",
			"Drak",
			"Orin",
			"Quen",
		];
		const suffixes = [
			"dor",
			"wen",
			"mir",
			"thas",
			"rin",
			"las",
			"nor",
			"ion",
			"wyn",
			"var",
			"lyn",
			"ros",
			"dil",
			"eth",
			"mar",
			"tis",
			"vor",
			"wyn",
			"dar",
		];
		const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
		const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
		return prefix + suffix;
	}
}
