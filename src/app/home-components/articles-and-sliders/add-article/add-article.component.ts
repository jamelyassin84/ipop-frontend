import { ArticleService } from './../../../Services/home/news/article.service'
import { Component, OnInit } from '@angular/core'
import { Alert, Fire, HasApprovals } from 'src/app/modules/extras/Alert'
import { ReloadService } from 'src/app/Services/reload.service'

@Component({
	selector: 'AddArticle',
	templateUrl: './add-article.component.html',
	styleUrls: ['./add-article.component.scss'],
})
export class AddArticleComponent implements OnInit {
	constructor(private articleService: ArticleService) {}

	ngOnInit(): void {}

	photos: any[] = []
	article: any = {
		title: '',
		body: '',
	}

	trigger() {
		document.getElementById('file')?.click()
	}

	readURL(event: any) {
		if (event.target.files && event.target.files[0]) {
			this.photos = []
			Object.keys(event.target.files).forEach((i: any) => {
				const reader = new FileReader()
				reader.readAsDataURL(event.target.files[i])
				reader.onload = (event: any) => {
					this.photos.push((<FileReader>event.target).result)
				}
			})
		}
	}

	deleteTemporaryImage(index: number) {
		this.photos.splice(index, 1)
	}

	isLoading: boolean = false
	saveAritcle() {
		this.article.files = this.photos
		Fire(
			'Save Changes?',
			'Are you sure you want to add this article?',
			'info',
			() => {
				this.isLoading = true
				this.articleService.create(this.article).subscribe(() => {
					HasApprovals('Created')
					this.isLoading = false
				})
			}
		)
	}
}
