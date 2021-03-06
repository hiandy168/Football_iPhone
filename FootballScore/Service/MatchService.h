//
//  MatchService.h
//  FootballScore
//
//  Created by qqn_pipi on 11-9-25.
//  Copyright 2011年 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CommonService.h"
#import "MatchEvent.h"
#import "MatchStat.h"

@class Match;

@protocol MatchServiceDelegate <NSObject>

@optional
- (void)getRealtimeMatchFinish:(int)result
                    serverDate:(NSDate*)serverDate
                   leagueArray:(NSArray*)leagueArray
              updateMatchArray:(NSArray*)updateMatchArray;

//- (void)getMatchEventFinish:(int)result match:(Match *)match;

- (void)getMatchEventFinish:(int)result data:(NSString*)data;

- (void)getRealtimeScoreFinish:(NSSet*)updateMatchSet;

- (void)getScoreUpdateFinish:(NSSet *)scoreUpdateSet resultCode:(NSInteger) resultCode;

- (void)getMatchDetailHeaderFinish:(NSArray*)headerInfo;

- (void)getMatchOupeiFinish:(int)result data:(NSString*)data;


@end

@interface MatchService : CommonService {
    
    int currentScoreType;
    id<MatchServiceDelegate> currentDelegate;
    
    NSTimer *realtimeScoreTimer;
    NSTimer *realtimeMatchTimer;

    id<MatchServiceDelegate> matchControllerDelegate;
    id<MatchServiceDelegate> scoreUpdateControllerDelegate;
}

@property (nonatomic, retain) NSTimer *realtimeScoreTimer;
@property (nonatomic, retain) NSTimer *realtimeMatchTimer;
@property (nonatomic, assign) id<MatchServiceDelegate> matchControllerDelegate;
@property (nonatomic, assign) id<MatchServiceDelegate> scoreUpdateControllerDelegate;

- (void)getRealtimeMatch:(id<MatchServiceDelegate>)delegate matchScoreType:(int)matchScoreType;
- (void)addRealtimeMatchUpdateToQueue:(id<MatchServiceDelegate>)delegate matchScoreType:(int)matchScoreType;
- (void)getRealtimeScore;

- (void)getMatchEvent:(id<MatchServiceDelegate>)delegate matchId:(NSString *)matchId;
- (void)getMatchDetailHeader:(id<MatchServiceDelegate>)delegate matchId:(NSString*)matchId;
- (void)updateLatestFollowMatch;

- (void)getMatchOupei:(id<MatchServiceDelegate>)delegate matchId:(NSString *)matchId;

- (void)stopAllUpdates;
- (void)startAllUpdates:(id<MatchServiceDelegate>)delegate 
         matchScoreType:(int)matchScoreType;
- (void)stopRealtimeMatchUpdate;
- (void)startRealtimeMatchUpdate;

- (void)followMatch:(NSString*)userId match:(Match*)match;
- (void)unfollowMatch:(NSString*)userId match:(Match*)match;

@end

extern MatchService *GlobalGetMatchService();