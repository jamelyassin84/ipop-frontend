import {Component, EventEmitter, Input, Output} from '@angular/core'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'
import {ArticleType} from 'src/app/Types/Article.types'

@Component({
    selector: 'home-article',
    templateUrl: './home-article.component.html',
    animations: [...dbwAnimations],
})
export class HomeArticleComponent {
    constructor() {}

    @Output()
    onTransformImages = new EventEmitter<string>()

    @Output()
    onRemoveArticle = new EventEmitter<string>()

    @Input()
    article?: ArticleType

    @Input()
    isUser?: boolean

    @Input()
    isSuperAdmin?: boolean

    @Input()
    imageViewer?: any

    loaded: boolean = false

    showMore: boolean = false
}
