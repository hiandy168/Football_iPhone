//
//  ScoreUpdateCell.m
//  FootballScore
//
//  Created by qqn_pipi on 11-9-28.
//  Copyright 2011年 __MyCompanyName__. All rights reserved.
//

#import "ScoreUpdateCell.h"
#import "ScoreUpdate.h"
#import "DataUtils.h"
#import "TimeUtils.h"
#import "LocaleConstants.h"
@implementation ScoreUpdateCell
@synthesize leagueName;
@synthesize startTime;
@synthesize matchState;
@synthesize homeTeam;
@synthesize awayTeam;
@synthesize homeTeamEvent;
@synthesize awayTeamEvent;
@synthesize matchScore;
@synthesize scoreTypeName;
@synthesize eventStateImage;
@synthesize deleteButton;
@synthesize scoreUpdateCellDelegate;

- (IBAction)clickDeleteButton:(id)sender {
    if (self.scoreUpdateCellDelegate && [self.scoreUpdateCellDelegate respondsToSelector:@selector(endClickDeleteButton:)]) {
        [self.scoreUpdateCellDelegate endClickDeleteButton:self.indexPath];
    }
}

+ (ScoreUpdateCell*)createCell:(id)delegate
{
    NSArray *topLevelObjects = [[NSBundle mainBundle] loadNibNamed:@"ScoreUpdateCell" owner:self options:nil];
    // Grab a pointer to the first object (presumably the custom cell, as that's all the XIB should contain).  
    if (topLevelObjects == nil || [topLevelObjects count] <= 0){
        NSLog(@"create <ScoreUpdateCell> but cannot find cell object from Nib");
        return nil;
    }
    
    ((ScoreUpdateCell*)[topLevelObjects objectAtIndex:0]).delegate = delegate;
    
    return (ScoreUpdateCell*)[topLevelObjects objectAtIndex:0];
}

+ (NSString*)getCellIdentifier
{
    return @"ScoreUpdateCell";
}

+ (CGFloat)getCellHeight
{
    return 48.0f;
}

//buttonId = 0 for homeTeam, other for awayTeam;
- (void)setTeamEventButton:(NSInteger)buttonId message:(NSString *)message color:(UIColor *)color
{
    UIButton *settingButton = buttonId ? awayTeamEvent : homeTeamEvent;
    UIButton *hiddenButton = (!buttonId) ? awayTeamEvent : homeTeamEvent;
    [settingButton setHidden:NO];
    [hiddenButton setHidden:YES];
    settingButton.titleLabel.text = message;
    settingButton.titleLabel.backgroundColor = color;
}

- (void)setCellInfo:(ScoreUpdate *)scoreUpdate
{
    if (scoreUpdate == nil) {
        self.matchState.text = @"00";
        return;
    }
    self.matchState.text =  [DataUtils toMatchStatusString:[scoreUpdate state] language:1];
    self.startTime.text = dateToChineseStringByFormat([scoreUpdate startTime], @"hh:mm");
    self.leagueName.text = [scoreUpdate leagueName];
    self.homeTeam.text = [scoreUpdate homeTeamName];
    self.awayTeam.text = [scoreUpdate awayTeamName];
    self.matchScore.text = [NSString stringWithFormat:@"%@ : %@",
                            [scoreUpdate homeTeamScore],[scoreUpdate awayTeamScore]];

    
    //set event type
    NSInteger type = scoreUpdate.scoreUpdateType;
    
    if (type < HOMETEAMRED) {
        //score type
        //TO DO set score event image 
        self.scoreTypeName.text = FNS(@"比分");
        [self setTeamEventButton:type message:@"进球" color:[UIColor greenColor]];
        
    }else if(type < HOMETEAMYELLOW)
    {
        // red card type
        //TO DO set red card event image 
        self.scoreTypeName.text = FNS(@"比数");
        [self setTeamEventButton:type-HOMETEAMRED  message:FNS(@"红牌") color:[UIColor redColor]];
        
    }else if(type < TYPECOUNT)
    {
        //yellow card type
        //TO DO set yellow card event image 
        self.scoreTypeName.text = FNS(@"比数");
        [self setTeamEventButton:type-HOMETEAMYELLOW  message:FNS(@"黄牌") color:[UIColor yellowColor]];
    }
}

- (void)dealloc {
    [leagueName release];
    [startTime release];
    [matchState release];
    [homeTeam release];
    [awayTeam release];
    [homeTeamEvent release];
    [awayTeamEvent release];
    [matchScore release];
    [scoreTypeName release];
    [eventStateImage release];
    [deleteButton release];
    [super dealloc];
}
@end
