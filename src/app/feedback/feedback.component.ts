import { Component } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  allFeed:any=[]
  
constructor(private api:ApiCallService,private tostr:ToastrService){}

ngOnInit() {
  this.getData()
}

  getData(){
    this.api.getUseFeed().subscribe((res:any)=>{
      this.allFeed=res
    })
  }

  deleteFeedBackUser(id:any){
    this.api.deleteFeed(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.tostr.success("Deleted feedback!!")
        this.getData()
      },
      error:(err:any)=>{
        this.tostr.error("Deleteion Faild!!")
        console.log(err);
      }
    })
  }


  clearAllFeed(){
    this.api.deleteAllFeedBack().subscribe({
      next:(res:any)=>{
        console.log(res.deletedCount);
        this.tostr.success(`Clear all FeedBacks!! ${res.deletedCount} Items`)
        this.getData()
      },
      error:(err:any)=>{
        this.tostr.error("Deletion Faild!!")
        console.log(err);
        
      }
    })
  }



}
