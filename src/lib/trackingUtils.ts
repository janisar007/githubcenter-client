// services/trackingService.ts
import { InteractionType } from '@/types/interactions'; 
// import { useAuth } from '@/hooks/useAuth'; 
import { interactionService } from '@/api/interactionService';

export const trackInteraction = async (
  postId: string,
  interactionType: InteractionType,
  additionalData: Record<string, any> = {},
  elementId='default',
  category:any
) => {
  try {
    // const { userId } = useAuth();
    const userId = localStorage.getItem('userId')
    console.log(userId)
    
    // Don't track if no user (or track as anonymous if desired)
    if (!userId) {
        console.log("UserId not found")
        return;
    }
    
    // Prepare the tracking payload
    const payload = {
      userId: userId,
      postId,
      interactionType,
      metadata: {
        ...additionalData,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        weight: getClickWeight(elementId),
        elementId,
        category
        // Add any other relevant context
      }
    };

    // Send to backend

    const response = await interactionService.registerInteraction(payload)
    // const response = await fetch('/api/interactions/track', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(payload),
    // });

    if (!response.status) {
      console.error('Tracking failed:');
    }
  } catch (error) {
    console.error('Error tracking interaction:', error);
  }
};

// Convenience methods for specific interaction types
export const trackView = (postId: string, elementId:string, category:any) => 
  trackInteraction(postId, InteractionType.VIEW,{}, elementId, category);

export const trackClick = (postId: string, elementId:string, category:any) => 
  trackInteraction(postId, InteractionType.CLICK,{}, elementId, category);

export const trackBid = (postId: string, amount: number, elementId:string, category:any) => 
  trackInteraction(postId, InteractionType.BID, { bidAmount: amount }, elementId, category);

export const trackSave = (postId: string, elementId:string, category:any) => 
  trackInteraction(postId, InteractionType.SAVE, {}, elementId, category);

export const trackShare = (postId: string, platform: string, elementId:string, category:any) => 
  trackInteraction(postId, InteractionType.SHARE, { sharePlatform: platform }, elementId, category);


function getClickWeight(elementId?: string): number {
  const weights: Record<string, number> = {
    'bid-button': 1.2,
    'save-button': 1.0,
    'share-button': 0.9,
    'post-card': 0.7,
    'post-link': 0.8,
    'default': 0.5
  };
  return elementId ? weights[elementId] || weights.default : weights.default;
}