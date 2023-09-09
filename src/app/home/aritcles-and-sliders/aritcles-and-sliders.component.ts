import {Component, OnInit} from '@angular/core'
import {Subject, Subscription} from 'rxjs'
import {takeUntil} from 'rxjs/operators'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'
import {Alert, Deleted, Fire, pop} from 'src/app/modules/extras/Alert'
import {ArticleService} from 'src/app/Services/home/news/article.service'
import {QuickLinksService} from 'src/app/Services/home/news/quick-links.service'
import {SliderService} from 'src/app/Services/home/news/slider.service'
import {UserService} from 'src/app/Services/Independent/user.service'
import {ReloadService} from 'src/app/Services/reload.service'
import {ArticleType} from 'src/app/Types/Article.types'

@Component({
    selector: 'app-aritcles-and-sliders',
    templateUrl: './aritcles-and-sliders.component.html',
    styleUrls: ['./aritcles-and-sliders.component.scss'],
    animations: [...dbwAnimations],
})
export class AritclesAndSlidersComponent implements OnInit {
    public innerWidth: any

    constructor(
        private slideService: SliderService,
        private component: ReloadService,
        private articleService: ArticleService,
        private service: QuickLinksService,
        private user: UserService,
    ) {}

    readonly isUser = !this.user.isAdmin()
    readonly isSuperAdmin = this.user.isSuperAdmin()
    readonly filterList = ['all', 'today', 'week', 'month']
    readonly destroyed$ = new Subject()

    tabs: any = {
        all: true,
        today: false,
        week: false,
        month: false,
    }

    quickLinks: any = []

    images: string[] = []

    articles: ArticleType[] = []

    currentImages: any = []

    ngOnInit(): void {
        this.innerWidth = window.innerWidth

        this.getSliders()
        this.getArticlesByPeriod('index')
        this.getQuickLinks()

        this.component
            .shouldReload()
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
                this.ngOnInit()
            })
    }

    ngOnDestroy(): void {
        this.destroyed$.next(null)
        this.destroyed$.complete()
    }

    setTab(tab: 'all' | 'today' | 'week' | 'month' | any) {
        for (let key in this.tabs) {
            this.tabs[key] = false
        }
        this.tabs[tab] = true
        this.getArticlesByPeriod(tab === 'all' ? 'index' : tab)
    }

    getArticlesByPeriod(period: 'index' | 'today' | 'week' | 'month') {
        this.articleService[period]().subscribe((articles: ArticleType[]) => {
            this.articles = articles.reverse()
        })
    }

    getSliders() {
        this.slideService.index().subscribe((sliders: []) => {
            sliders.forEach((slide: any) => {
                this.images.push(slide.photo.uri)
            })
            sliders.length !== 0 ? pop() : ''
        })
    }

    transformImages(photos: any) {
        this.currentImages = []
        photos.forEach((photo: any) => {
            this.currentImages.push(photo.file.uri)
        })
    }

    removeArticle(id: any) {
        Fire(
            'Delete Article?',
            'Are you sure you want to permanently delete this data?',
            'info',
            () => {
                this.articleService.destroy(id).subscribe(() => {
                    Alert('Success', 'Article has been removed', 'success')
                })
            },
        )
    }

    getQuickLinks() {
        this.service.index().subscribe((quickLinks: any[]) => {
            this.quickLinks = quickLinks.reverse()
        })
    }

    removeLink(id: number) {
        Fire(
            'Delete Link?',
            'Are you sure you want to permanently remove this data?',
            'info',
            () => {
                this.service.destroy(id).subscribe(() => {
                    Deleted()
                })
            },
        )
    }

    onResize() {
        this.innerWidth = window.innerWidth
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
