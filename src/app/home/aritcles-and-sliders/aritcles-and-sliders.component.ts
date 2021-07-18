import { Component, OnInit } from '@angular/core'
import { Fire, pop } from 'src/app/components/Alert'
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

	images: any[] = []
	getSliders() {
		this.slideService.index().subscribe((sliders: []) => {
			sliders.forEach((slide: any) => {
				this.images.push(slide.photo.uri)
			})
			sliders.length !== 0 ? pop() : ''
		})
	}

	articles: ArticleType[] = []
	getArticles() {
		this.articleService.index().subscribe((articles: ArticleType[]) => {
			this.articles = articles
			console.log(articles)
		})
	}

	removeArticle(id: number) {
		Fire('Delete Article?', 'Are you sure you want to permanently delete this data?', 'info', () => {
			this.articleService.destroy(id).subscribe()
		})
	}
}
