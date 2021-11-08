import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RoadOwnerAPIService} from 'src/app/webapi/api/road-onwer.service';
import {UserDTO} from 'src/app/webapi/models/user';
import {RoadCommons} from 'src/app/modules/dictionaries/models/road-commons';
import {RoadOwnerDTO} from 'src/app/webapi/models/road-owner.dto';
import {NotifyService} from 'src/app/modules/commons/services/notify.service';

@Component({
  selector: 'app-road-owner-edit',
  templateUrl: './road-owner-edit.component.html',
  styleUrls: ['./road-owner-edit.component.css']
})
export class RoadOwnerEditComponent implements OnInit {

  requiredFieldText = 'Поле обязательно для заполнения.';

  roadOwnerForm: FormGroup = this.formBuilder.group({
    id: '',
    Users: this.formBuilder.array([]),
    Person: '',
    Organization: this.formBuilder.group({
      id: '',
      Name: ['', [Validators.required]],
      CName: '',
      EgrulDate: '',
      HeadName: ['', [Validators.required]],
      Position: '',
      Ogrn: ['', [Validators.required]],
      Inn: ['', [Validators.required]],
      KPP: ['', [Validators.required]],
      OKOGU: ['', [Validators.required]],
      OKPO: ['', [Validators.required]],
      OKVED: ['', [Validators.required]],
      OKOPF: ['', [Validators.required]],
      OKFS: ['', [Validators.required]],
      OKTMO: ['', [Validators.required]],
    }),
    PostAddress: ['', [Validators.required]],
    Phone: '',
    Fax: '',
    UserPhone: '',
    Email: ['', [Validators.required]],
    RightDocType: ['', [Validators.required]],
    RightDocDetails: ['', [Validators.required]],
    OwnerType: '',
    Region: ''
  });

  rightDocTypes = RoadCommons.RightDocType;
  roadUsageTypes = RoadCommons.RoadUsageTypes;

  public get users(): any {
    return (<FormArray>this.roadOwnerForm.controls.Users).controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: RoadOwnerAPIService,
    private notifyService: NotifyService,
  ) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.apiService.get(params['id']).subscribe(dto => {
          // костыль
          // нужен для случаев с пустым Users, т.к. form.setValue не может это обработать
          // и для случаев с непустым, т.к. определение формы Users вынесено из roadOwnerForm
          const users: UserDTO[] = dto.Users;
          // @ts-ignore
          dto.Organization.Position = dto.Position;
          dto.Organization.EgrulDate = new Date(dto.Organization.EgrulDate);
          console.log('DTO: ', dto);
          delete dto.Users;

          this.roadOwnerForm.setValue(dto.prepareFormData(this.roadOwnerForm));
          this.setUsers(users);
        });
      }
    });

    this.route.data.subscribe(data => {
      if (data['id'] === 'my') {
        this.apiService.getMyOwner().subscribe(dto => {
          // костыль
          // нужен для случаев с пустым Users, т.к. form.setValue не может это обработать
          // и для случаев с непустым, т.к. определение формы Users вынесено из roadOwnerForm

          // Приводим дату к нужному формату
          dto.Organization.EgrulDate = new Date(dto.Organization.EgrulDate);

          const users: UserDTO[] = dto.Users;
          delete dto.Users;
          this.roadOwnerForm.setValue(dto.prepareFormData(this.roadOwnerForm));
          // console.log('Users info', users);
          this.setUsers(users);
        });
      }
    });
  }

  setUsers(users: UserDTO[]) {
    const control = this.formBuilder.array([]);
    users.forEach(x => {
      control.push(this.formBuilder.group({
        id: x.id,
        username: x.username,
        email: x.email,
        first_name: x.first_name,
        last_name: x.last_name,
        is_active: x.is_active,
        is_staff: x.is_staff,
        is_superuser: x.is_superuser
      }));
    });
    this.roadOwnerForm.setControl('Users', control);
  }

  ngOnInit() {
  }

  cancelClick(): void {
    this.router.navigate(['', 'road-owner']);
  }

  public submitClick(): void {
    if (this.roadOwnerForm.invalid) {
      Object.keys(this.roadOwnerForm.controls)
        .forEach(controlName => this.roadOwnerForm.controls[controlName].markAsTouched());

      return;
    }

    const dto: RoadOwnerDTO = this.apiService.getInstance(this.roadOwnerForm.getRawValue());

    // @ts-ignore
    dto.Position = dto.Organization.Position;

    // @ts-ignore
    dto.Organization.EgrulDate = dto.Organization.EgrulDate.toISOString().slice(0, 10);

    this.apiService.save(dto).subscribe(d => {
      this.notifyService.show('Пользователь успешно сохранен!');
    });
  }
}
