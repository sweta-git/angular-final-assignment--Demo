import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Category } from './category';
import { error } from 'util';
import { CategoryService } from '../services/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  errMessage: string;
  categories: Category[];
  category: Category;

  constructor(private categoryService: CategoryService, public dialogRef: MatDialogRef<CreateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.category = new Category();
    this.categories = [];
  }

  ngOnInit() {
  }
  // Category creation on click on save button along with validation
  saveCategory() {
    if (this.category.categoryName === '' && this.category.categoryDescription === '') {
      this.errMessage = 'Name and Description both are required fields';
    }
    if (this.category.categoryName !== '' && this.category.categoryDescription !== '') {
      this.errMessage = '';
      this.categoryService.addCategory(this.category).subscribe(addedCategory => {

      }, err => {
        this.errMessage = err.message;
        const index = this.categories.findIndex(category => category.id === this.category.id);
        this.categories.splice(index, 1);
      });
    }
    this.dialogRef.close();
  }
}
