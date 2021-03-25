<template>
    <v-container class="my-4">
		<v-stepper v-model="e1">
			<v-stepper-header>
				<v-stepper-step :complete="e1 > 1" step="1">Enter NovelUpdates UID</v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step :complete="e1 > 2" step="2">Select Lists to Import</v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step :complete="e1 > 3" step="3">Assign Status</v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step :complete="loadingUpdate" step="4">Import Novels</v-stepper-step>
			</v-stepper-header>

			<v-stepper-items>
				<v-stepper-content step="1">
					<v-card flat height="400px">
						<v-layout justify-center align-center fill-height>
							<v-flex xs7>
								<v-form ref="form">
									<v-text-field 
									label="NovelUpdates UID" 
									v-model="userID" 
									color="black" 
									prepend-icon="book" 
									hint="The UID of your NovelUpdates account. You can find it by going to 'User Profile' and looking at the number in the URL." 
									persistent-hint 
									:rules="rules.uid"
									></v-text-field>
								</v-form>
							</v-flex>
							<v-flex xs1>
								<v-btn flat @click="submitUID()" :loading="loading">Submit</v-btn>
							</v-flex>
						</v-layout>
					</v-card>

					<v-btn
					color="primary"
					@click="e1=2"
					:disabled="!validUID"
					>
					Continue
					</v-btn>
				</v-stepper-content>

				<v-stepper-content step="2">
					<v-card
					height="400px"
					flat
					>
						<v-layout align-center justify-center fill-height>
							<v-flex xs7>
								<v-select
									v-model="selectedLists"
									:items="listNames"
									label="Lists"
									hint="Select the lists you want to import"
									persistent-hint
									multiple
									chips
									:menu-props="{bottom: true, offsetY: true}"
								></v-select>
							</v-flex>
						</v-layout>
					</v-card>

					<v-btn
					color="primary"
					@click="e1=3"
					:disabled="!selectedLists.length > 0"
					>
					Continue
					</v-btn>

					<v-btn flat color="error" @click="e1=1">Back</v-btn>
				</v-stepper-content>

				<v-stepper-content step="3">
					<v-card
					height="400px"
					flat
						>
						<v-layout align-center justify-center fill-height wrap>
							<v-flex xs5 class="mx-3" v-for="list in selectedLists" :key="list">
								<v-select
									:items="['Reading', 'Paused', 'Dropped', 'Planned', 'Completed']"
									:label="list"
									v-model="importListsData[list].target"
									hint="Select the status you wish to import this list to"
									persistent-hint
									:menu-props="{bottom: true, offsetY: true}"
								></v-select>
							</v-flex>
						</v-layout>
					</v-card>

					<v-btn
					color="primary"
					@click="e1=4"
					:disabled="!selectedLists.length > 0"
					>
					Continue
					</v-btn>

					<v-btn flat color="error" @click="e1=2">Back</v-btn>
				</v-stepper-content>

				<v-stepper-content step="4">
					<v-card
					height="400px"
					flat
					>
					
						<v-layout justify-center align-center wrap>
			
							<v-flex xs12>
								<v-btn
								color="primary"
								@click="getNovelData(); disableImport=!disableImport"
								:loading="loadingUpdate"
								size="x-large"
								:disabled="disableImport"
								>
								Import Lists
								</v-btn>
							</v-flex>

							<v-flex xs8>
								<v-textarea
								placeholder="Imported novels will appear here..."
								height="400"
								readonly
								no-resize
								full-width
								:value="listLog"
								>
								</v-textarea>
							</v-flex>

						</v-layout>

					</v-card>

					<v-btn flat color="error" @click="e1=3">Back</v-btn>
				</v-stepper-content>
			</v-stepper-items>
		</v-stepper>
    </v-container>	

	
</template>

<script>
const request = require('request');
import { db } from '@/fb';

export default {
    data() {
		return {
			disableImport: false,
			listLog: '',
			validUID: false,
			selectedLists: [],
			importListsData: {},
			formattedImportLists: [],
			e1: 0,
			show: false,
			userID: '',
			loading: false,
			loadingUpdate: false,
			lists: {},
			listNames: [],
			rules: {
				uid: [
					v => !!v || 'UID required'
				]
			}
		}
	},
	watch: {
		'selectedLists': function() {
			this.getNovelLinks();
		} 
	},
	methods: {
		submitUID() {
			if (this.$refs.form.validate()) {
				this.listNames = [];
				this.loading = true;
				const options = { 
					method: 'POST',
					url: window.location.origin + '/api/novel/lists',
					headers: 
					{ 'cache-control': 'no-cache',
						Host: window.location.origin,			
						'Cache-Control': 'no-cache',
						Accept: '*/*',
						'content-type': 'application/json' },
					body: {userID: this.userID},
					json: true
				};

				request(options, (error, response, body) => body.indexOf('error') != -1 ? console.log("Request lists error: " + body) : this.updateLists(body));
			}
		},
		updateLists(payload) {
			this.lists = payload;
			for (let list in this.lists) {
				this.listNames.push(this.lists[list].name);
			}
			this.loading = false;
			this.show = true;
		
			this.validUID = true;
		},
		getNovelLinks() {
			this.importListsData = [];
			for (let i=0; i<this.selectedLists.length; i++) {
				for (let j=0; j<this.lists.length; j++) {
					if(this.lists[j].name === this.selectedLists[i]) {
						const objData = {
							num: this.lists[j].position,
							target: ''
						}
						this.importListsData[this.lists[j].name] = objData;
						break;
					}
				}
			}
		},
		getNovelData() {
			this.formatImportList();
			this.loadingUpdate = true;
			const options = { 
				method: 'POST',
				url: window.location.origin + '/api/novel/lists/data',
				headers: 
				{ 'cache-control': 'no-cache',
					Host: window.location.origin,			/* Change host on production deployment */
					Accept: '*/*',
					'Content-Type': 'application/json' },
				body: {uid: this.userID, lists: this.formattedImportLists},
				json: true };
			request(options, (error, response, body) => {
				this.importLists(body)
				this.loadingUpdate = false;
				});
		},
		formatImportList() {
			this.formattedImportLists = [];
			for (let list in this.importListsData) {
				this.formattedImportLists.push(this.importListsData[list]);
			}
		},

		importLists(lists) {
			for (let i = 0; i < lists.length; i++) {
				const list = lists[i];
				for (let j = 0; j < list.novels.length; j++) {
					const curNovel = list.novels[j];
					const options = { 
						method: 'POST',
						url: window.location.origin + '/api/novel',
						headers: 
						{ 'cache-control': 'no-cache',
							Host: window.location.origin,			
							'Cache-Control': 'no-cache',
							'Content-Type': 'application/json' },
						body: { url: curNovel.url},
						json: true 
					};
					
					request(options, (error, response, body) => {
						const novel = {
							author: body[2],
							coverUrl: body[1],
							title: body[0],
							type: body[3],
							chapters: list.listName == 'Planned' ? 'Planned' : (curNovel.progress == '' ? 'Error' : curNovel.progress),
							volumes: '0',
							status: list.listName.toLowerCase()
						} 
						if (novel.chapters[0].toLowerCase() == 'c') {
							novel.chapters = novel.chapters.replace('c', '');
						}
						else if (novel.chapters[0].toLowerCase() == 'v') {
							console.log(novel.chapters);
							const splitProg = novel.chapters.toLowerCase().includes('c') ? novel.chapters.split('c') : novel.chapters.trim().split(' ');
							novel.volumes = splitProg[0].replace('v', '');
							novel.chapters = splitProg[1] ? splitProg[1] : 0;
						}
						this.listLog = this.listLog + `Title: ${novel.title}\nYour Progress: ${novel.chapters}\nVolumes: ${novel.volumes}\nReading Status: ${novel.status}\n===============\n`;
						db.collection('users')
						.doc(this.$store.state.uid)
						.collection('novels')
						.add(novel)
						.catch(err => {
							console.log(`Error adding ${novel}.`)
						})
					})
				}
			}
		}

	}
}
</script>

<style>
.v-select-list .v-list__tile:hover {
  background-color: rgb(25, 118, 210, 0.3) !important;
}

.v-select-list .v-list__tile--active {
  background-color: #1976d2;
}

.v-select-list .v-list__tile--active:hover {
  background-color: rgb(25, 118, 210, 0.8) !important;
}
</style>


