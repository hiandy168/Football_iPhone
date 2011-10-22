//
//  MatchDetailController.m
//  FootballScore
//
//  Created by qqn_pipi on 11-9-28.
//  Copyright 2011年 __MyCompanyName__. All rights reserved.
//

#import "MatchDetailController.h"
#import "DataUtils.h"
#import "TimeUtils.h"
#import "FileUtil.h"
#import "LocaleConstants.h"
#import "DetailHeader.h"
#import "PPApplication.h"
#import "MatchManager.h"
#import "MatchConstants.h"
#import "LogUtil.h"

@implementation MatchDetailController

@synthesize homeTeamIcon;
@synthesize awayTeamIcon;
@synthesize matchStateLabel;
@synthesize matchStarttimeLabel;
@synthesize homeTeamName;
@synthesize awayTeamName;
@synthesize homeTeamRank;
@synthesize awayTeamRank;
@synthesize eventButton;
@synthesize lineUpButton;
@synthesize analysisButton;
@synthesize asianOdds;
@synthesize auropeanOdds;
@synthesize sizeButton;
@synthesize dataWebView;
@synthesize eventJsonArray;
@synthesize statJsonArray;
@synthesize oupeiString;
@synthesize eventString;

@synthesize match;
@synthesize detailHeader;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
        firstLoadWebView = YES;
    }
    return self;
}

-(id)initWithMatch:(Match *)aMatch
{
    self = [super init];
    if (self) {
        self.match = aMatch;
    }
    return self;
}

- (void)resetWithMatch:(Match*)newMatch
{
    self.match = newMatch;
    self.eventString = nil;
    self.oupeiString = nil;
    
    currentSelection = SELECT_EVENT;
    [self updateSelectMatchStatusButtonState:currentSelection];
    
    [self loadMatchDetailHeaderFromServer];
    [self showWebViewByClick:YES];
}

- (void)dealloc
{
    [eventString release];
    [oupeiString release];
    [match release];
    [eventJsonArray release];
    [statJsonArray release];
    
    [homeTeamIcon release];
    [awayTeamIcon release];
    [matchStateLabel release];
    [matchStarttimeLabel release];
    [homeTeamName release];
    [awayTeamName release];
    [homeTeamRank release];
    [awayTeamRank release];
    [eventButton release];
    [lineUpButton release];
    [analysisButton release];
    [asianOdds release];
    [auropeanOdds release];
    [sizeButton release];
    [dataWebView release];
    
    [detailHeader release];
    [super dealloc];
}

- (void)didReceiveMemoryWarning
{
    // Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];
    
    // Release any cached data, images, etc that aren't in use.
}

#pragma mark - View lifecycle

- (void)viewDidLoad
{
    
    currentSelection = SELECT_EVENT;
    [self updateSelectMatchStatusButtonState:MATCH_DATA_STATUS_EVENT];             

    [super viewDidLoad];
    
    // left button 
    NSString * leftButtonName = @"ss.png";    
    [self setNavigationLeftButton:FNS(@"返回") imageName:leftButtonName action:@selector(clickBack:)];
    
    // right button
    NSString * rightButtonName = @"refresh.png";    
    [self setNavigationRightButton:nil imageName:rightButtonName action:@selector(clickReflashLeftButton)];    
    
    // set title
    [self.navigationItem setTitle:FNS(@"赛事数据")];
    
    self.dataWebView.hidden = YES;

    [super viewDidLoad];
    [self initWebView];
}

- (void)viewDidDisappear:(BOOL)animated
{
//    [self.timer invalidate];    
    [super viewDidDisappear:animated];
}

- (void)viewDidAppear:(BOOL)animated
{
//    if (self.timer){
//        [self.timer fire];
//    }
    
    [super viewDidAppear:animated];
}

- (void)viewDidUnload
{
    [self.timer invalidate];
    [self setTimer:nil];
    
    [self setHomeTeamIcon:nil];
    [self setAwayTeamIcon:nil];
    [self setMatchStateLabel:nil];
    [self setMatchStarttimeLabel:nil];
    [self setHomeTeamName:nil];
    [self setAwayTeamName:nil];
    [self setHomeTeamRank:nil];
    [self setAwayTeamRank:nil];
    [self setEventButton:nil];
    [self setLineUpButton:nil];
    [self setAnalysisButton:nil];
    [self setAsianOdds:nil];
    [self setAuropeanOdds:nil];
    [self setSizeButton:nil];
    [self setDataWebView:nil];
    
    [self setDetailHeader:nil];
    [super viewDidUnload];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    // Return YES for supported orientations
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}


- (void)updateSelectMatchStatusButtonState:(int)selectMatchStatus
{
    
    
    for ( int i=MATCH_DATA_STATUS_EVENT; i<=MATCH_DATA_STATUS_SIZE; i++){
        UIButton* button = (UIButton*)[self.view viewWithTag:i];
        if (i == selectMatchStatus) {
            [button setSelected:YES];  
            [button setBackgroundImage:[UIImage imageNamed:@"data_m_2.png"] forState:UIControlStateNormal];
            [button setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
        }
        else{
            [button setSelected:NO];
            [button setBackgroundImage:[UIImage imageNamed:@"data_m_1.png"] forState:UIControlStateNormal];
            [button setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
        }   
    }

    /*
    
    for (int i=MATCH_DATA_STATUS_EVENT; i<=MATCH_DATA_STATUS_SIZE; i++){        
            switch (i) {
            case MATCH_DATA_STATUS_EVENT:
            {                             
                [self matchDataButtonBackGround : selectMatchStatus ];
            }
                break;
            case MATCH_DATA_STATUS_LINEUP:
            {
                 [self matchDataButtonBackGround : selectMatchStatus ];             
            }
                break; 
            case MATCH_DATA_STATUS_ANALYSIS:
            {
                 [self matchDataButtonBackGround : selectMatchStatus ];
            }
                break; 
            case MATCH_DATA_STATUS_ASIANODDS:
            {
                 [self matchDataButtonBackGround : selectMatchStatus ];
            }
                break; 
            case MATCH_DATA_STATUS_AUROPEANODDS:
            { 
                [self matchDataButtonBackGround : selectMatchStatus ];           
            }
                break; 
            case MATCH_DATA_STATUS_SIZE:
            {
                 [self matchDataButtonBackGround : selectMatchStatus ];             
            }
                break; 
            default:
                break;
        }
    }
     
    */ 
}

#pragma Ou Pei
#pragma mark - 

- (void)loadOupeiDataFromServer
{
    [self showActivityWithText:FNS(@"加载数据中...")];
    [GlobalGetMatchService() getMatchOupei:self matchId:match.matchId];
}

- (void)getMatchOupeiFinish:(int)result data:(NSString*)data
{
    [self hideActivity];
    showDataFinish = YES;
    
    if (result == 0){
        self.oupeiString = data;
        if (currentSelection == SELECT_OUPEI){
            [self updateOupeiView:self.oupeiString];
        }
    }
}

- (void)updateOupeiView:(NSString*)oupeiDataString
{           
    NSString *jsCode = [NSString stringWithFormat:@"updateOupeiDetail(\"%@\");", oupeiDataString];      
    PPDebug(@"<displayOupei> execute java script = %@",jsCode);        
    [self.dataWebView stringByEvaluatingJavaScriptFromString:jsCode];   

    [self hideActivity];
    self.dataWebView.hidden = NO;    
}

// return the view is shown directly or not
- (BOOL)showOupeiView:(BOOL)needReload
{
    if (self.oupeiString == nil || needReload){
        [self loadOupeiDataFromServer];
        return NO;
    }
    
    [self updateOupeiView:self.oupeiString];
    return YES;
}

- (void)updateYapeiView:(NSString*)dataString
{           
    NSString *jsCode = [NSString stringWithFormat:@"showYapeiView(%@);", match.matchId];      
    PPDebug(@"<updateYapeiView> execute java script = %@",jsCode);        
    [self.dataWebView stringByEvaluatingJavaScriptFromString:jsCode];   
    
    [self hideActivity];
    self.dataWebView.hidden = NO;    
}

// return the view is shown directly or not
- (BOOL)showYapeiView:(BOOL)needReload
{
    [self updateYapeiView:nil];
    return YES;
}

#pragma Event
#pragma mark - 

- (void)loadMatchEventFromServer
{
    [self showActivityWithText:@"加载数据中..."];
    [GlobalGetMatchService() getMatchEvent:self matchId:match.matchId];    
}

- (void)getMatchEventFinish:(int)result data:(NSString *)data
{    
    [self hideActivity];
    if (result == 0) {                
        
        self.eventString = data;        
        if (currentSelection == SELECT_EVENT){
            [self updateEventView:self.eventString];
        }
    }
}

- (void)updateEventView:(NSString*)eventDataString
{
    NSString *jsCode = [NSString stringWithFormat:@"updateMatchDetail(\"%@\");",eventDataString];    
    PPDebug(@"<displayEvent> execute JS = %@",jsCode);    
    [self.dataWebView stringByEvaluatingJavaScriptFromString:jsCode];    
    
    self.dataWebView.hidden = NO;    
    [self hideActivity];
}

// return the view is shown directly or not
- (BOOL)showEventView:(BOOL)needReload
{
    if (self.eventString == nil || needReload){
        [self loadMatchEventFromServer];
        return NO;
    }
    
    [self updateEventView:self.eventString];
    return YES;
}

#pragma Header Methods
#pragma mark -

- (void) setHeaderInfo:(DetailHeader *)header
{
    
    self.matchStateLabel.text = [DataUtils toMatchStatusString:header.matchStatus];

    NSDate *date = dateFromStringByFormat(header.matchDateString, DEFAULT_DATE_FORMAT);
    
    
    NSString *dateString = dateToStringByFormat(date, @"MM/dd HH:mm");
    
    if (date && dateString) {
        self.matchStarttimeLabel.text = [NSString stringWithFormat:@"[%@]",dateString];
    }else{
        self.matchStarttimeLabel.text = nil;
    }
    
    NSInteger lang = [LanguageManager getLanguage];
    
    //acoording to the language setting, show the team names.
    if (lang == LANG_CANTON) {
        self.homeTeamName.text = header.homeTeamYYName;
        self.awayTeamName.text = header.awayTeamYYName;
    }else{
        self.homeTeamName.text = header.homeTeamSCName;
        self.awayTeamName.text = header.awayTeamSCName;
    }
    
    if ([header.homeTeamRank length] > 0) {
        self.homeTeamRank.text = [NSString stringWithFormat:@"[%@]",header.homeTeamRank];
    }else{
        self.homeTeamRank.text = nil;
    }
    if ([header.awayTeamRank length] > 0) {
        self.awayTeamRank.text = [NSString stringWithFormat:@"[%@]",header.awayTeamRank];
    }else{
        self.awayTeamRank.text = nil;
    }
    
    [self.homeTeamIcon clear];
    self.homeTeamIcon.url = [NSURL URLWithString:header.homeTeamImage];
    [GlobalGetImageCache() manage:self.homeTeamIcon];
    
    [self.awayTeamIcon clear];
    
    self.awayTeamIcon.url = [NSURL URLWithString:header.awayTeamImage];
    [GlobalGetImageCache() manage:self.awayTeamIcon];    
    
}

- (void)loadMatchDetailHeaderFromServer
{
    [self showActivityWithText:FNS(@"加载数据中...")];    
    [GlobalGetMatchService() getMatchDetailHeader:self matchId:match.matchId];  
}

- (void)getMatchDetailHeaderFinish:(NSArray*)headerInfo
{
    DetailHeader* header = [[DetailHeader alloc] initWithDetailHeaderArray:headerInfo];
    self.detailHeader = header;
    [self setHeaderInfo:self.detailHeader];
    [header release];
}

#pragma Web View Related & Web View Delegate
#pragma mark - 

- (void)showWebView:(BOOL)needReload
{
    switch (currentSelection) {
        case SELECT_EVENT:
            [self showEventView:needReload];
            break;
            
        case SELECT_OUPEI:
            [self showOupeiView:needReload];
            break;
            
        case SELECT_YAPEI:
            [self showYapeiView:needReload];
            break;
            
        default:
            break;
    }
}

- (void)loadWebViewByHtml:(NSString*)html
{
    self.dataWebView.hidden = YES;
    loadCounter = 0;
    showDataFinish = NO;
    
    NSURL* url = [FileUtil bundleURL:html];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    NSLog(@"load webview url = %@", [request description]);
    if (request) {
        [self.dataWebView loadRequest:request];        
    }        
}

- (BOOL)isAppLaunched
{
    NSString *jsCode = [NSString stringWithFormat:@"isAppLaunched();"];    
    PPDebug(@"<isAppLaunched> execute JS = %@",jsCode);    
    NSString* result = [self.dataWebView stringByEvaluatingJavaScriptFromString:jsCode];
    NSLog(@"result = %@", result);
    if ([result intValue] == 1)
        return YES;
    else
        return NO;
}

- (void)initWebView
{
    [self showActivityWithText:FNS(@"加载数据中...")];
    [self loadWebViewByHtml:@"www/match_detail.html"];
}

- (void)webViewDidStartLoad:(UIWebView *)webView
{   
    NSLog(@"webViewDidStartLoad, isLoading=%d", webView.loading);  
    
}

- (void)detectAppLaunch
{
    [self.timer invalidate];
    self.timer = [NSTimer scheduledTimerWithTimeInterval:0.1 target:self selector:@selector(checkAppLaunched) userInfo:nil repeats:NO];
}

- (void)checkAppLaunched
{
    if ([self isAppLaunched]){
        self.timer = nil;
        firstLoadWebView = NO;
        isWebViewReady = YES;
        
        [self showWebView:YES];        // this is the first time, so need reload
        return;
    }
    
    // if not, continue to detect
    [self detectAppLaunch];
}

- (void)webViewDidFinishLoad:(UIWebView *)webView
{
    NSLog(@"webViewDidFinishLoad, isLoading=%d", webView.loading);
    loadCounter ++; 
    
    [self detectAppLaunch];    
}

- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error
{
    NSLog(@"<webView> didFailLoadWithError, error=%@", [error description]);
}

#pragma Button Actions
#pragma mark -

- (void)updateButtonState:(UIButton*)button
{
    int selectMatchStatus = button.tag;
    [self updateSelectMatchStatusButtonState:selectMatchStatus];    
}

- (void)showWebViewByClick:(BOOL)needReload
{
    if (isWebViewReady){
        [self showWebView:needReload];
    }
}

- (void)handleClickButton:(id)sender selection:(int)newSelection
{
    if (currentSelection == newSelection)
        return;
    
    [self updateButtonState:sender];    
    currentSelection = newSelection;
    [self showWebViewByClick:NO];    
}

- (IBAction)clickMatchesDatasButton:(id)sender;
{       
    [self handleClickButton:sender selection:SELECT_EVENT];
}

- (IBAction)clickMatchesOupeiButton:(id)sender
{
    [self handleClickButton:sender selection:SELECT_OUPEI];
}

- (IBAction)clickSelectYapeiButton:(id)sender
{
    [self handleClickButton:sender selection:SELECT_YAPEI];
}

- (IBAction)clickSelectLineupButton:(id)sender
{
    [self handleClickButton:sender selection:SELECT_LINEUP];
}

- (IBAction)clickSelectAnalysisButton:(id)sender
{
    [self handleClickButton:sender selection:SELECT_ANALYSIS];    
}

- (IBAction)clickSelectDaxiaoButton:(id)sender
{
    [self handleClickButton:sender selection:SELECT_DAXIAO];
}

- (void)clickReflashLeftButton{            
    
    [self showWebViewByClick:YES];
    
    NSLog(@"reflashing now ");
     
}

- (void)clickBack:(id)sender
{
//    [self.dataWebView stopLoading];
//    self.dataWebView = nil;
    [self.navigationController popViewControllerAnimated:YES];
}

@end
