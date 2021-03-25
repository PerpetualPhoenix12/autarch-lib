<template>
	<v-dialog max-width="800px" v-model="dialog" color="white" persistent no-click-animation>
		<v-btn slot="activator" flat class="black--text">
			<v-icon left>add_circle</v-icon>
			<span> Add novel </span>
		</v-btn>
		<v-card>
			<v-card-title class="black--text">
				<span class="headline">Add Novel</span>
		</v-card-title>
			<v-form ref="form" v-model="valid" lazy-validation>	
				<v-card-text>
					<v-container grid-list-md>
							<v-layout wrap>
								<v-flex xs12>
									<v-text-field label="Title" v-model="novel.title" color="black" prepend-icon="book" hint="Title of the novel" :rules="rules.title"></v-text-field>
								</v-flex>
								<v-flex xs12>
									<v-text-field label="Author" v-model="novel.author" color="black" prepend-icon="edit" hint="Author of the novel" :rules="rules.author"></v-text-field>
								</v-flex>
								<v-flex xs6>
									<v-text-field label="Chapters" v-model="novel.chapters" color="black" prepend-icon="folder" hint="Last chapter you read" :rules="rules.chapters"></v-text-field>
								</v-flex>
								<v-flex xs6>
									<v-text-field label="Volumes" v-model="novel.volumes" color="black" hint="Volume of last chapter (if any)" :rules="rules.volumes"></v-text-field>
								</v-flex>
								<v-flex xs6>
									<v-select :items="['reading', 'paused', 'dropped', 'planned', 'completed']" label="Status" v-model="novel.status" color="black" prepend-icon="remove_red_eye" :rules="rules.status"></v-select>
								</v-flex>
								<v-flex xs6>
									<v-select :items="['CN', 'KR', 'JP', 'LN']" label="Type" v-model="novel.type" color="black" :rules="rules.type"></v-select>
								</v-flex>
								
								<v-flex xs12>
									<v-text-field label="Cover Url" v-model="novel.coverUrl" color="black" prepend-icon="code" hint="URL for the book cover" :rules="rules.coverUrl"></v-text-field>
								</v-flex>
								<v-divider />
								<v-flex xs12>
									<v-text-field label="NovelUpdates URL" color="black" append-outer-icon="send" @click:append-outer="showInfo()" v-model="target" hint="Enter the novel's NU link to autocomplete the form" persistent-hint></v-text-field>
								</v-flex>
							</v-layout>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-btn flat color="success" class="mt-3" :loading="loading" @click="submit()" :disabled="!valid">Add Novel</v-btn>
					<v-spacer></v-spacer>
					<v-btn flat color="warning" class="mt-3" @click="clear()">Clear</v-btn>
					<v-btn flat color="error" class="mt-3" @click="dialog=false; clear()">Cancel</v-btn>
				</v-card-actions>
			</v-form>
        </v-card>
    </v-dialog>
</template>

<script>
import { db } from '@/fb';

/* eslint-disable */
const request = require('request');

export default {
	data() {
		return {
			dialog: false,
			loading: false,
			valid: true,
			target: '',
			novel: {
				author: '',
				coverUrl: '',
				title: '',
				chapters: '',
				volumes: '0',
				type: '',
				status: ''
			},
			rules: {
				author: [
					v => !!v || 'Author is required' 
				],
				coverUrl: [
					v => !!v || 'Cover URL is required'
				],
				title: [
					v => !!v || 'Tite is required'
				],
				chapters: [
					v => !!v || 'Last chapter is required'
				],
				volumes: [
					v => !!v || 'Volume count is required'
				],
				status: [
					v => !!v || 'Status is required'
				],
				type: [
					v => !!v || 'Type is required'
				]
			},
			urlExp: /^(?:http(s)?:\/\/)?[\w.-]+(novelupdates.com\/series\/)+[\w-]+(\/)?$/
		}
	},
	methods: {
		showInfo() {
			if (this.urlExp.test(this.target)) {
				const options = { 
					method: 'POST',
					url: window.location.origin + '/api/novel',
					headers: 
					{ 'cache-control': 'no-cache',
						Host: window.location.origin,			
						'Cache-Control': 'no-cache',
						Accept: '*/*',
						'Content-Type': 'application/json' },
					body: { url: this.target},
					json: true };
				request(options, (error, response, body) => body.indexOf('error') != -1 ? console.log(body) : this.update(body));
			} else {
				alert("Invalid url");
			}
		},
		update(body) {
			this.novel.title = body[0];
			this.novel.coverUrl = body[1];
			this.novel.author = body[2];
			this.novel.type = body[3];
		},
		submit() {
			if (this.$refs.form.validate()) {
				this.loading = true;

				db.collection('users')
				.doc(this.$store.state.uid)
				.collection('novels')
				.add(this.novel)
				.then(() => {
					this.loading = false;
					this.$emit('novelAdded');
					this.dialog = false;
					this.clear();
				})
			}
		},
		clear() {
			this.$refs.form.reset();
		},
	}
};

</script>