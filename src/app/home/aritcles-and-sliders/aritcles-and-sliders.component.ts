import { Component, OnInit } from '@angular/core'
import { Alert, Fire, pop } from 'src/app/components/Alert'
import { ArticleService } from 'src/app/Services/home/news/article.service'
import { SliderService } from 'src/app/Services/home/news/slider.service'
import { ReloadService } from 'src/app/Services/reload.service'
import { ArticleType } from 'src/app/Types/Article.types'

@Component({
	selector: 'app-aritcles-and-sliders',
	templateUrl: './aritcles-and-sliders.component.html',
	styleUrls: ['./aritcles-and-sliders.component.scss'],
})
export class AritclesAndSlidersComponent implements OnInit {
	constructor(
		private slideService: SliderService,
		private component: ReloadService,
		private articleService: ArticleService
	) {
		this.component.shouldReload().subscribe(() => {
			this.ngOnInit()
		})
	}
	ngOnInit(): void {
		this.getSliders()
		this.getArticles()
	}

	images: string[] = []
	getSliders() {
		this.slideService.index().subscribe((sliders: []) => {
			sliders.forEach((slide: any) => {
				this.images.push(slide.photo.uri)
			})
			sliders.length !== 0 ? pop() : ''
		})
	}

	articles: ArticleType[] = []
	currentImages: any = []

	transformImages(photos: any) {
		this.currentImages = []
		photos.forEach((photo: any) => {
			this.currentImages.push(photo.file.uri)
		})
	}
	getArticles() {
		this.articleService.index().subscribe((articles: ArticleType[]) => {
			this.articles = articles
		})
	}

	removeArticle(id: number) {
		Fire('Delete Article?', 'Are you sure you want to permanently delete this data?', 'info', () => {
			this.articleService.destroy(id).subscribe(() => {
				Alert('Success', 'Article has been removed', 'success')
			})
		})
	}
}
