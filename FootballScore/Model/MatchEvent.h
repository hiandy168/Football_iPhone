//
//  MatchEvent.h
//  FootballScore
//
//  Created by qqn_pipi on 11-9-25.
//  Copyright 2011年 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>


@interface MatchEvent : NSObject {
    
    int         homeAwayFlag;
    int         type;
    int         minutes;
    NSString    *player;
}

@end
