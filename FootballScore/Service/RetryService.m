//
//  RetryService.m
//  FootballScore
//
//  Created by haodong qiu on 11-11-25.
//  Copyright (c) 2011年 orange. All rights reserved.
//

#import "RetryService.h"
#import "RetryManager.h"
#import "FootballNetworkRequest.h"
#import "LogUtil.h"
#import "UserManager.h"


#define RETRY_FOLLOW_MATCH     @"RETRY_FOLLOW_MATCH"
#define RETRY_UNFOLLOW_MATCH   @"RETRY_UNFOLLOW_MATCH"




@implementation RetryService

- (void)retryFollowMatch:(NSString*)userId matchId:(NSString*)matchId 
{
   dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0),^{
        CommonNetworkOutput* output = [FootballNetworkRequest followUnfollowMatch:userId matchId:matchId type:FOLLOW_MATCH_TYPE];
        
        dispatch_async(dispatch_get_main_queue(), ^{
            if(output.resultCode == ERROR_SUCCESS)
            {
                PPDebug(@"Retry follow match (%@) success",matchId);
                [[RetryManager defaultManager] removeFollowUnfollowFromUserDefaults:matchId type:FOLLOW_MATCH_TYPE];
            }
            else
            {
                PPDebug(@"Retry follow match (%@) fail,error = %d",matchId,output.resultCode);
            }
        });
    });

}

- (void)retryUnfollowMatch:(NSString*)userId matchId:(NSString*)matchId 
{
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0),^{
        CommonNetworkOutput* output = [FootballNetworkRequest followUnfollowMatch:userId matchId:matchId type:UNFOLLOW_MATCH_TYPE];
        
        dispatch_async(dispatch_get_main_queue(), ^{
            if(output.resultCode == ERROR_SUCCESS)
            {
                PPDebug(@"Retry unfollow match (%@) success",matchId);
                [[RetryManager defaultManager] removeFollowUnfollowFromUserDefaults:matchId type:UNFOLLOW_MATCH_TYPE];
            }
            else
            {
                PPDebug(@"Retry unfollow match (%@) fail,error = %d",matchId,output.resultCode);
            }
        });
    });
    
}

- (void)retryFollowUnfollowList:(NSString*)userId
{
    NSMutableDictionary *failedRequestsList = [[RetryManager defaultManager] getFollowUnfollowListFromUserDefaults];
    NSEnumerator *enumerator = [failedRequestsList keyEnumerator];
    
    NSString *matchId;
    NSString *type;
    
    while(matchId = [enumerator nextObject])
    {
        type =  [failedRequestsList objectForKey:matchId];
        if ([type isEqualToString:FOLLOW_MATCH_TYPE])
        {
            [self retryFollowMatch:userId matchId:matchId];
        }
        else
        {
            [self retryUnfollowMatch:userId matchId:matchId];
        }
    }
    
}

- (void)retryPushSet:(NSString*)userId token:(NSString*)token
{
    if ([[RetryManager defaultManager] getNeedRetryPushSet])
    {
        dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0),^{
            
            CommonNetworkOutput* output = [FootballNetworkRequest updateUserPushInfo:userId pushType:[UserManager getIsPush] token:token];
            
            dispatch_async(dispatch_get_main_queue(), ^{
                if([output.textData isEqualToString:PUSH_SET_SUCCESS])
                {
                     [[RetryManager defaultManager] saveNeedRetryPushSet:NO];
                    PPDebug(@"<RetryService>)Retry push set success");
                }
                else
                {
                    PPDebug(@"<RetryServicee>)Retry push set failed");
                }
            });
        });

    }
}

@end
