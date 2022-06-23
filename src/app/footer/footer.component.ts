import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";

interface InstagramNode {
  name: string;
  children?: InstagramNode[];
}

const TREE_DATA: InstagramNode[] = [
  {
    name: 'Instagram',
    children: [{name: 'STEFAN'}, {name: 'Jakob'}, {name: 'Luca'}],
  },
];

interface InstagramFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  private _transformer = (node: InstagramNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }
  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);
  treeControl = new FlatTreeControl<InstagramFlatNode>(
    node => node.level, node => node.expandable);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  newsletterForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit(): void {
    this.newsletterForm = this.formBuilder.group({
        email: ['', [Validators.email]],
      },
    )
  }

  hasChild = (_: number, node: InstagramFlatNode) => node.expandable;

  getEmailErrorMessage() {
    return this.newsletterForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  getInstagramLink(name: string): string {
    if (name === 'STEFAN') {
      return 'https://www.instagram.com/dagrubi/';
    } else {
      return '';
    }
  }




}
