import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import C from '../util/asyncComponent';

class UrlMapping extends Component {
  render() {
    const { match } = this.props;
    const { url } = match;

    return (
      <Switch>
        <Route path={`${url}/main`} component={C(e => import('./routes/System/Main'))} />
        <Route path={`${url}/signInLawFirm`} component={C(e => import('../containers/LawFirmSignIn'))} />
        <Route path={`${url}/casescreen`} component={C(e => import('../containers/CaseScreen/index'))} />

        <Route path={`${url}/Case/save`} component={C(e => import('./routes/Case/View/Create'))} />
        <Route path={`${url}/Case`} component={C(e => import('./routes/Case/View/index'))} />

        <Route path={`${url}/NoticeMng`} component={C(e => import('./routes/System/NoticeMng/View'))} />
        <Route
          path={`${url}/userMng/save`}
          component={C(e => import('./routes/System/UserMng/View/UserCreate/index'))}
        />
        <Route path={`${url}/userMng`} component={C(e => import('./routes/System/UserMng/View'))} />
        <Route path={`${url}/Document`} component={C(e => import('./routes/Document/View'))} />
        <Route path={`${url}/Consultation`} component={C(e => import('./routes/Consultation/View'))} />
        <Route path={`${url}/Task`} component={C(e => import('./routes/Task/View'))} />

        <Route
          path={`${url}/customer/customerUpload`}
          component={C(e => import('./routes/Customer/View/CustomerUpload'))}
        />

        <Route
          path={`${url}/customer/companyUpload`}
          component={C(e => import('./routes/Customer/View/CompanyUpload'))}
        />

        <Route path={`${url}/customer/detail`} component={C(e => import('./routes/Customer/View/Customer/Detail'))} />

        <Route path={`${url}/customer`} component={C(e => import('./routes/Customer/View/Customer'))} />

        <Route path={`${url}/individual`} component={C(e => import('./routes/Customer/View/Individual'))} />

        <Route path={`${url}/company/detail`} component={C(e => import('./routes/Customer/View/Company/Detail'))} />

        <Route path={`${url}/company`} component={C(e => import('./routes/Customer/View/Company'))} />

        <Route
          path={`${url}/additionalFunctions/workCalculator`}
          component={C(e => import('./routes/AdditionalFunctions/View/WorkCalculator'))}
        />

        <Route path={`${url}/contract`} component={C(e => import('./routes/Contract/View'))} />
        <Route path={`${url}/memo`} component={C(e => import('./routes/Memo/View'))} />
        <Route path={`${url}/timeSheet`} component={C(e => import('./routes/TimeSheet/View'))} />
        <Route path={`${url}/invoice`} component={C(e => import('./routes/Invoice/View'))} />
        <Route
          path={`${url}/ComponentsTest/FieldRowTest`}
          component={C(e => import('./routes/ComponentsTest/FieldRowTest'))}
        />
        <Route
          path={`${url}/ComponentsTest/AlignBoxTest`}
          component={C(e => import('./routes/ComponentsTest/AlignBoxTest'))}
        />
        <Route
          path={`${url}/ComponentsTest/SelectTest`}
          component={C(e => import('./routes/ComponentsTest/SelectTest'))}
        />
        <Route
          path={`${url}/ComponentsTest/InputTest`}
          component={C(e => import('./routes/ComponentsTest/InputTest'))}
        />
        <Route
          path={`${url}/ComponentsTest/GridTableTest`}
          component={C(e => import('./routes/ComponentsTest/GridTableTest'))}
        />
        <Route
          path={`${url}/ComponentsTest/TableTest`}
          component={C(e => import('./routes/ComponentsTest/TableTest'))}
        />
        <Route
          path={`${url}/ComponentsTest/TableTest2`}
          component={C(e => import('./routes/ComponentsTest/TableTest2'))}
        />
        <Route
          path={`${url}/ComponentsTest/TableTest3`}
          component={C(e => import('./routes/ComponentsTest/TableTest3'))}
        />
        <Route
          path={`${url}/ComponentsTest/SplitterTest`}
          component={C(e => import('./routes/ComponentsTest/SplitterTest'))}
        />
        <Route
          path={`${url}/ComponentsTest/DialogTest`}
          component={C(e => import('./routes/ComponentsTest/DialogTest'))}
        />
        <Route
          path={`${url}/ComponentsTest/ExcelImportTest`}
          component={C(e => import('./routes/ComponentsTest/ExcelImportTest'))}
        />
        <Route
          path={`${url}/ComponentsTest/DateRangeTest`}
          component={C(e => import('./routes/ComponentsTest/DateRangeTest'))}
        />
        <Route
          path={`${url}/ComponentsTest/ToolTipTest`}
          component={C(e => import('./routes/ComponentsTest/ToolTipTest'))}
        />
        <Route
          path={`${url}/ComponentsTest/FileUploadTest`}
          component={C(e => import('./routes/ComponentsTest/FileUploadTest'))}
        />
        <Route
          path={`${url}/ComponentsTest/SwitchTest`}
          component={C(e => import('./routes/ComponentsTest/SwitchTest'))}
        />
        <Route
          path={`${url}/ComponentsTest/ContentCardTest`}
          component={C(e => import('./routes/ComponentsTest/ContentCardTest'))}
        />
        <Route path={`${url}/ComponentsTest/TabTest`} component={C(e => import('./routes/ComponentsTest/TabTest'))} />
        <Route
          path={`${url}/ComponentsTest/DragDropTest`}
          component={C(e => import('./routes/ComponentsTest/DragDropTest'))}
        />
        <Route
          path={`${url}/ComponentsTest/ListDetailContainerTest`}
          component={C(e => import('./routes/ComponentsTest/ListDetailContainerTest'))}
        />
        <Route path={`${url}/ComponentsTest/BoxTest`} component={C(e => import('./routes/ComponentsTest/BoxTest'))} />

        <Route
          path={`${url}/ComponentsTest/ImageCropper`}
          component={C(e => import('./routes/ComponentsTest/ImageCropperTest'))}
        />

        <Route
          path={`${url}/ComponentsTest/TimePickerTest`}
          component={C(e => import('./routes/ComponentsTest/TimePickerTest'))}
        />
        <Route path={`${url}/ComponentsTest/EtcTest`} component={C(e => import('./routes/ComponentsTest/EtcTest'))} />

        <Route path={`${url}/LawFirmMng`} component={C(e => import('./routes/System/LawFirmMng/View'))} />
        <Route path={`${url}/CaseList`} component={C(e => import('./routes/Case/View/List'))} />
        <Route path={`${url}/CaseExcelUpload`} component={C(e => import('./routes/Case/View/ExcelUpload'))} />
        <Route
          path={`${url}/ComponentsTest/EditorTest`}
          component={C(e => import('./routes/ComponentsTest/EditorTest'))}
        />
        <Route
          path={`${url}/ComponentsTest/TemplateTest`}
          component={C(e => import('./routes/ComponentsTest/TemplateTest'))}
        />
        <Route
          path={`${url}/ComponentsTest/ConfirmDialogTest`}
          component={C(e => import('./routes/ComponentsTest/ConfirmDialogTest'))}
        />
        <Route
          path={`${url}/ComponentsTest2/AgendaTest`}
          component={C(e => import('./routes/ComponentsTest2/AgendaTest'))}
        />
        <Route
          path={`${url}/ComponentsTest2/AlertDialogTest`}
          component={C(e => import('./routes/ComponentsTest2/AlertDialogTest'))}
        />
        <Route
          path={`${url}/ComponentsTest2/AllSearchTest`}
          component={C(e => import('./routes/ComponentsTest2/AllSearchTest'))}
        />
        <Route
          path={`${url}/ComponentsTest2/AutoCompleteTest`}
          component={C(e => import('./routes/ComponentsTest2/AutoCompleteTest'))}
        />
        <Route
          path={`${url}/ComponentsTest2/CreateUserTest`}
          component={C(e => import('./routes/ComponentsTest2/CreateUserTest'))}
        />
        <Route
          path={`${url}/ComponentsTest2/LoginTest`}
          component={C(e => import('./routes/ComponentsTest2/LoginTest'))}
        />
        <Route
          path={`${url}/ComponentsTest2/ProfileTest`}
          component={C(e => import('./routes/ComponentsTest2/ProfileTest'))}
        />
        <Route
          path={`${url}/ComponentsTest2/ProgressBarTest`}
          component={C(e => import('./routes/ComponentsTest2/ProgressBarTest'))}
        />
        <Route
          path={`${url}/ComponentsTest2/RadioButtonTest`}
          component={C(e => import('./routes/ComponentsTest2/RadioButtonTest'))}
        />
        <Route
          path={`${url}/ComponentsTest2/ScheduleDayTest`}
          component={C(e => import('./routes/ComponentsTest2/ScheduleDayTest'))}
        />
        <Route
          path={`${url}/ComponentsTest2/ScheduleMonthTest`}
          component={C(e => import('./routes/ComponentsTest2/ScheduleMonthTest'))}
        />
        <Route
          path={`${url}/ComponentsTest2/ScheduleWeekTest`}
          component={C(e => import('./routes/ComponentsTest2/ScheduleWeekTest'))}
        />
        <Route
          path={`${url}/ComponentsTest2/ScrollTest`}
          component={C(e => import('./routes/ComponentsTest2/ScrollTest'))}
        />
        <Route
          path={`${url}/ComponentsTest2/SidebarTest`}
          component={C(e => import('./routes/ComponentsTest2/SidebarTest'))}
        />
        <Route
          path={`${url}/ComponentsTest2/SliderTest`}
          component={C(e => import('./routes/ComponentsTest2/SliderTest'))}
        />
        <Route path={`${url}/ComponentsTest2/SmsTest`} component={C(e => import('./routes/ComponentsTest2/SmsTest'))} />
        <Route
          path={`${url}/ComponentsTest2/UserRatingTest`}
          component={C(e => import('./routes/ComponentsTest2/UserRatingTest'))}
        />
        <Route path={`${url}/ComponentsTest2/EtcTest`} component={C(e => import('./routes/ComponentsTest2/EtcTest'))} />
        <Route component={C(e => import('components/Error404'))} />
      </Switch>
    );
  }
}

export default UrlMapping;
