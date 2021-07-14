import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'AddArticle',
	templateUrl: './add-article.component.html',
	styleUrls: ['./add-article.component.scss'],
})
export class AddArticleComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	saveAritcle() {
		Fire('Save Changes?', 'Are you sure you want to add this article?', 'info', () => {})
	}
}
