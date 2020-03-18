import React from 'react';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import ContentCard from '../../components/ContentCard';
import Select from '../../components/Select';
import Grid from '../../components/Grid';
import Information from '../../components/Information';
import Button from '../../components/Button';
import {withStyles} from "@material-ui/core";
import '../../styles/pages/_screen.scss';
const options = [
    { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
    { key: 'apple', text: 'Apple' },
    { key: 'banana', text: 'Banana' },
    { key: 'orange', text: 'Orange', disabled: true },
    { key: 'grape', text: 'Grape' },
    { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
    { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
    { key: 'broccoli', text: 'Broccoli' },
    { key: 'carrot', text: 'Carrot' },
    { key: 'lettuce', text: 'Lettuce' }
  ];
class Tab1 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        selectedKey: 'all',
    }
    this.onChange = this.onChange.bind(this);
}
onChange(e){
    console.log(e)
    this.setState({
        selectedKey : e.target.value,
    });
}


render(){
    const { classes } = this.props;
    // const {  selectedKey, checked } = this.state;
    return(
        <div className={classes.tab1}>
             <ContentCard title="Case1"
                contents={[
                    <div className={classes.caseSectionWrapper}>
                        <div>                 
                            <p className={classes.para}>dfghjfghjk</p><span className={classes.spanMargin}>:</span>      
                            <p className={classes.paraRight}> 001</p>
                        </div>
                        <div>
                            <p className={classes.para}>Nudfghjkf</p><span className={classes.spanMargin}>:</span>
                            <p className={classes.paraRight}> 001</p>
                        </div>
                        <div>
                            <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                            <p className={classes.paraRight}> 001</p>
                        </div>
                        <div>
                            <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                            <p className={classes.paraRight}> 001</p>
                        </div>
                                                
                    </div>,
                    <div className={classes.caseSectionWrapper1}>
                        <div>
                            <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                            <div className={classes.dropdownElt}>
                                <Select placeholder="Select an Option" options={options} onChange={this.onChange}/>
                            </div>
                        </div>
                        <div>
                            <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                            <div className={classes.dropdownElt}>
                                <Select placeholder="Select an Option" options={options} onChange={this.onChange}/>
                            </div>
                        </div>
                        <div>
                            <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                            <div className={classes.dropdownElt}>
                                <Select placeholder="Select an Option" options={options} onChange={this.onChange}/>
                            </div>
                        </div>
                        <div>
                            <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                            <p className={classes.paraRight}>001</p>
                        </div>
                    </div>
                ]}/>
                <div>
                    <ContentCard title="Case2" actionButton={<div style={{float: 'right'}}><Button size="medium" color="dark">Button</Button></div>} 
                        contents={[
                            <div className={classes.caseSectionWrapper2}>
                                <div className={classes.caseSectnImage}>
                            
                                <i className="material-icons icon-color">
                                    account_circle
                                </i>
                                <span className={classes.sectn2Span}>dfghjk</span>
                            
                                
                            </div>
                                <div >
                                <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                <p className={classes.para}> 001</p>
                            </div>
                                <div >
                                <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                <p className={classes.para}> 001</p>
                            </div>
                                <div>
                                <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                <p className={classes.para}> 001</p>
                            </div>
                            
                            </div>,
                            <div className={classes.caseSectionWrapper3}>
                                <div className={classes.sectn2Rght}>
                                    <div>
                                        <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                        <p className={classes.para}> 001</p>
                                    </div>
                                    <div>
                                        <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                        <p className={classes.para}> 001</p>
                                    </div>
                                </div>
                            </div>  
                        ]}/>
                    </div>
                <div>
                <ContentCard title="Case3" actionButton={<div style={{float: 'right'}}><Button size="large" color="primary">Button</Button></div>} 
                    contents={[
                        <div className={classes.caseSectionWrapper4}>            
                            <div >
                                <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                <p className={classes.para}> 001</p>
                            </div>
                            <div >
                                <p className={classes.para}>Number</p><span className={classes.spanMargin}>:</span>
                                <p className={classes.para}> 001</p>
                            </div>
                            </div>,
                            <Grid center contents={[ 
                                {
                                    title: "FirstName",
                                    child: "Ashu"
                                },
                                {
                                    title: "LastName",
                                    child: "Pal"
                                },
                                {
                                    title: "Hobbies",
                                    child: "Sketching"
                                },
                                {
                                    title: "Qualification",
                                    child: "MCA"
                                }
                            ]}/>
                    
                        ]}
                    /> 
                </div>
                <div>
                    <ContentCard title="Case4" 
                        actionButton={ 
                        <div style={{float: 'right'}}> 
                        <Select placeholder="Select an Option" options={options} onChange={this.onChange} /></div>
                        }
                        contents={[
                            <Information 
                                contents={[
                                    {
                                    
                                        title:"2018-03-30()",
                                        child:(
                                            <div>
                                                <i className="material-icons icon-color">
                                                    account_circle
                                                </i>
                                                <p>Ashu's <b>law</b> case <b> open</b> </p>
                                            </div>        
                                        )
                                    },
                                    {
                                        title:"2018-03-30()",
                                            child:(
                                                <div>
                                                    <div className={classes.infoPadding}>
                                                        <i className="material-icons icon-color">
                                                            account_circle
                                                        </i>
                                                        <p>Ashu's <b>law</b> case <b> open</b> </p>
                                                    </div> 
                                                    <div className={classes.infoPadding}>
                                                        <i className="material-icons icon-color">
                                                        chat_bubble_outline
                                                        </i>
                                                        <p>Ashu's <b>law</b> case <b> open</b> </p>
                                                    </div> 
                                                    <div className={classes.infoPadding}>
                                                        <i className="material-icons icon-color">
                                                        delete
                                                        </i>
                                                        <p>Ashu's <b>law</b> case <b> open</b> </p>
                                                    </div> 
                                                    
                                                </div>       
                                            ) 
                                    }
                            ]}/>
                            
                        ]}
                    />
                </div>
                <div className={classes.sectn5Margin}>
                    <ContentCard contents={[
                        <p className={classes.sectn5Para}>Case Details</p>
                    ]}>
                    
                    </ContentCard>
                </div>
        </div>
    );
    }
}
const Styles = theme => ({
    container: {
        display: 'grid',
        // gridTemplateRows: '7% 93%',
        gridTemplateColumns: '1fr',
        margin: '30px',
        // height: '100%',
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        [theme.breakpoints.down('md')]: {
            margin: '20px 15px',
          },
    },
    header: {
        display: 'grid',
        gridTemplateRows: '1fr',
        gridTemplateColumns: '85% 15%',
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '80% 20%',
          },
          [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '75% 25%',
          },
          [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '60% 40%',
          },
    },
    initial: {
        display: 'grid'
    },
    second: {
        display: 'grid'
    },
    tabs: {
        display: 'grid',
        gridTemplateRows: '1fr',
        gridTemplateColumns: 'repeat(6,1fr)',
        width: '60%',
        gridGap: '10px',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
          },
    },
    tab1:{
        display: "grid",
        gridTemplateColumns: "8fr 5fr",
        gridTemplateRows:"1fr",
        gridGap:"10px",
        paddingTop: '10px',
        paddingBottom: '10px',
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: "1fr",
          },
    },
    tab2: {
        display: "grid",
        gridTemplateColumns: "8fr 4fr",
        gridTemplateRows:"1fr",
        gridGap:"10px",
        paddingTop: '10px',
        paddingBottom: '10px',
        [theme.breakpoints.down('1450')]: {
            gridTemplateColumns: "1fr",
          },
    },
    caseSectionWrapper: {
        width:'95%',
        position: 'relative', 
        borderRight: '1px solid lightgray',
        float: 'left',
        [theme.breakpoints.down('sm')]: {
            width: '99%',
            borderRight: '0',
          },
        
    },
    caseSectionWrapper1: {
        width:'95%',
        position: 'relative', 
        [theme.breakpoints.down('sm')]: {
            width: '99%',
          },
        
    },
    caseSectionWrapper2: {
        width:'95%',
        position: 'relative', 
       borderRight: '1.5px dotted lightgray',
        [theme.breakpoints.down('sm')]: {
            width: '99%',
            borderRight: '0',
          },
    },
    caseSectionWrapper3: {
        width:'99%',
        position: 'relative', 
       
        [theme.breakpoints.down('sm')]: {
            width: '99%',
          },
    },
    caseSectionWrapper4: {
        width:'99%',
        position: 'relative', 
       
        [theme.breakpoints.down('sm')]: {
            width: '99%',
          },
    },
    paraWrapper: {
        width: '6rem',
        display: 'inline-block'
    },
    para: {
        display: 'inline-block',
        verticalAlign: 'top',
        width: '5rem'
    },
    spanMargin:{
        paddingLeft: 15,
        paddingRight: 15,
        verticalAlign: 'top',
     },
     dropdownElt: {
        width: '8rem',
        display: 'inline-block',
        [theme.breakpoints.down('xs')]: {
            width: '160px',
          },

     },
     dropdownAccord: {
         width: '23%',
         display: 'inline-block',
         [theme.breakpoints.down('md')]: {
            width: '110px',
          },
     },
     sectn2Span: {
        verticalAlign: 'top',
        paddingLeft: 10,
        paddingRight: 10,
        position: 'relative',
    },
    caseSectnImage: {
        marginTop: 23,
        marginBottom: 10,
        [theme.breakpoints.down('xs')]: {
            marginTop: 0,
        }
    },
    sectn2Rght: {
        marginTop: 65,
        [theme.breakpoints.down('sm')]: {
            marginTop: 0,
          },
    },
    dropdownRght: {
        width:117,
    },
    sectn5Para: {
        textAlign: 'center',
    },
    sectn5Margin: {
        marginTop: '-161px',
        [theme.breakpoints.down('md')]: {
            marginTop: 0,
          },
    },
    formRghtBtnWrapr: {
        width: '100%',
        textAlign: 'center'
    },
    accord1: {
        width: '100%',
        flex: 1,
        
    },
    gridTable: {
        flex: 1,
        flexDirection: 'row',
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            display: 'block', 
            width: '100%',
            paddingRight: '7px',
          },
    },
    accordSupremeBtn: {
        marginBottom: 10,
    },
    btnMargin: {
        marginRight: 5,
        display: 'inline-block',
    },
    formSpanPadding: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: '.5rem',
        paddingRight: '.5rem',   

    },
    subBtnMargin: {
        float: 'left',
        marginLeft: 10,
    },
    accordRight: {
        width: '90%',
        display: 'inline-block',
        [theme.breakpoints.down('sm')]: {
            width: '84%',
          },
    },
    select: {
        width: '50%',
        display: 'inline-block',
    },
    accordRadiChkbox: {
        display: 'inline-block',
    float: 'left',
    width: '20%',
    marginTop: 0,
    marginLeft: 'auto',
    marginBottom: 0,
    marginRight: '15px',
    [theme.breakpoints.down('md')]: {
        width: '27%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '30%',
      },
      [theme.breakpoints.down('xs')]: {
        width: '50%',
      },
      
    },
    selectFormElt: {
        width: '130px',
        display: 'inline-block'
    },
    tab2HeadingWrapper: {
        display: 'grid',
    flexDirection: 'row'
    },
    tab2Buttons: {
        gridColumnEnd: 8,
        gridColumnStart: 2,
        alignSelf: 'center',
        
    },
    tab2RghtButtons: {
        // float: 'right',
        textAlign: 'right',
    },
    tab2HeadingRghtWrapper: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: '10px',
        [theme.breakpoints.down('1400')]: {
            gridGap: '0px',
          },
    },
    tab2Checkbox: {
        // display: 'inline-block',
        textAlign: 'center',
        width: '5rem',
        [theme.breakpoints.down('1560')]: {
            width: '0rem',
            textAlign: 'left'
          },
          [theme.breakpoints.down('1280')]: {
           textAlign: 'right',
           width: '4rem',
          },
          [theme.breakpoints.down('992')]: {
            textAlign: 'center',
            width: 0,
           },

    },
    infoPadding: {
        paddingBottom: 4,
        paddingTop: 4
    },
   
    paraRight: {
        width: '60%',
    display: 'inline-block',
    },
    
   


});

export default withStyles(Styles)(Tab1);