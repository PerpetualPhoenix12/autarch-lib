<template>
        <v-card>
            <v-card-title class="black--text">
                <span class="headline">
					Edit Novel
				</span>
				<v-spacer />
				<v-btn icon @click="alert(1)"><v-icon color="error">delete</v-icon></v-btn>
            </v-card-title>
            <v-form ref="form" v-model="valid" lazy-validation>	
				
                <v-card-text>
                    <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field label="Title" v-model="novel.title" color="black" append-icon="book" hint="Title of the novel" :rules="rules.title"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Author" v-model="novel.author" color="black" append-icon="edit" hint="Author of the novel" :rules="rules.author"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Chapters" v-model="novel.chapters" color="black" append-icon="folder" hint="Last chapter you read" :rules="rules.chapters"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Volumes" v-model="novel.volumes" color="black" hint="Volume of last chapter (if any)" :rules="rules.volumes"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select :items="['reading', 'paused', 'dropped', 'planned', 'completed']" label="Status" v-model="novel.status" color="black" append-icon="remove_red_eye" :rules="rules.status"></v-select>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select :items="['CN', 'KR', 'JP']" label="Type" v-model="novel.type" color="black" :rules="rules.type"></v-select>
                                </v-flex>
                                
                                <v-flex xs12>
                                    <v-text-field label="Cover Url" v-model="novel.coverUrl" color="black" append-icon="code" hint="URL for the book cover" :rules="rules.coverUrl"></v-text-field>
                                </v-flex>
                                <v-divider />
                            </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn flat color="success" class="mt-3" :loading="loading" @click="submit()" :disabled="!valid">Update</v-btn>
					<v-spacer />
                    <v-btn flat color="warning" class="mt-3" @click="reset()">Reset</v-btn>
                    <v-btn flat color="error" class="mt-3" @click="$router.go(-1)">Cancel</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
</template>

<script>
import { db } from '@/fb';

/* eslint-disable */
const request = require('request');

export default {
	data() {
		return {
			loading: false,
			valid: true,
			buffer: {},
			novel: {},
			rules: {
				author: [
					v => !!v || 'Author is required' 
				],
				coverUrl: [
					v => !!v || 'Cover URL is required',
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
				type: [
					v => !!v || 'Type is required'
				],
				status: [
					v => !!v || 'Status is required'
				]
			}
		}
	},
	methods: {
		submit() {
			if (this.$refs.form.validate()) {
				this.loading = true;

				db.collection('users')
				.doc(this.$store.state.uid)
				.collection('novels')
				.doc(this.novel.id)
				.set(this.novel, {merge:true})
                .then(() => {
					this.loading = false;
					this.$emit('novelUpdated');
					window.history.go(-1);
				})
			}
		},
		clear() {
			this.$refs.form.reset();
		},
		reset() {
			this.update();
		},
		update() {
			const novel = this.$store.getters.fetchNovel(this.$route.params.novelID);
			this.buffer = {...novel};
			this.novel = {...novel};
		},
		remove() {
			
		}
	},
	created() {
		this.update();
	}
};

</script>


<style>

.v-list__tile--active {
	background-color: black !important;
	color: white !important;
}

</style>