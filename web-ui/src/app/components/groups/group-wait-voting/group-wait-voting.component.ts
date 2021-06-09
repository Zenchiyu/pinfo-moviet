import { Component, OnInit } from '@angular/core';
import { GroupsComponent } from '../groups.component'
import { Group } from '../../../shared/interfaces/group';
import { UsersStatus } from '../../../shared/interfaces/users-status';
import { UserStatusValue } from '../../../shared/interfaces/users-status';
import { UserService } from '../../../services/user.service';
import { GroupService } from 'src/app/services/group.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-group-wait-voting',
  templateUrl: './group-wait-voting.component.html',
  styleUrls: ['./group-wait-voting.component.css']
})
export class GroupWaitVotingComponent implements OnInit {

  currentGroup?: Group;

  private timerRefreshResult? :NodeJS.Timeout;

  constructor(private groupsComponent : GroupsComponent, private groupService: GroupService, private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    let thenGroupimport = () => {
      this.currentGroup = this.groupsComponent.currentGroup; // save the current group
    };

    this.groupsComponent.getGroup(undefined, () => {thenGroupimport(); this.setUserStatus();});

    // refresh group info every x micro-seconds:
    this.timerRefreshResult = setInterval(() => {this.groupsComponent.getGroup(undefined, thenGroupimport);}, 1000);
  }

  goToWaitResult() { // go to the wait-result page
    if (this.timerRefreshResult != undefined) {
      this.clearTimer();
    }
    this.router.navigate(['wait-result'], {relativeTo: this.route.parent, skipLocationChange: true});
  }

  endVoting() {
    //TODO: test if admin:
    this.skipPref();
  }

  skipPref() {
    // TODO: only the admin should skip
    if (this.currentGroup != undefined) {
      // change the group status
      this.groupService.setGroupStatus(this.currentGroup.id, UserStatusValue.DONE) // change the group status to DONE
        .subscribe(()=>{
          this.goToWaitResult(); // go to wait result
        });
    }
  }

  getMyUserId(): string { //! Temporary
    return '1';
  }

  setUserStatus(then: () => any = () => void 0, onError?: () => any) {
    this.groupsComponent.getGroup(undefined, () => {
        let groupId = this.groupsComponent.currentGroup!.id;
        this.groupService.getGroupStatus(groupId)
          .subscribe((groupStatus) => {
            if (groupStatus == UserStatusValue.VOTING) {
              this.groupService.setUserStatus(groupId, this.getMyUserId(), UserStatusValue.DONE) // change status to DONE
                .subscribe(()=> {
                  then();
                }, () => {
                  if (onError == undefined) {
                    then();
                  } else {
                    onError();
                  }
                }); 
            } else {
              if (onError == undefined) {
                then();
              } else {
                onError();
              }
            }
          }, () => {
            if (onError == undefined) {
              then();
            } else {
              onError();
            }
          });
    });
  }

  clearTimer() {
    if(this.timerRefreshResult!=undefined) clearInterval(this.timerRefreshResult);
  }
}
